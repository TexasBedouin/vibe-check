#!/usr/bin/env node
// bake.js: turn a vibe-check board into a file that opens with no server.
// Plain Node, no dependencies. See references/DIAGRAM-SYSTEM.md, "How to render a board".
//
//   node bake.js <board> <data.json> <out.html>            renderer + data, engine.css copied beside it
//   node bake.js <board> <data.json> <out.html> --inline   one fully self-contained file
//   node bake.js <board> <data.json> <out.html> --srcdoc   an <iframe srcdoc="..."> snippet for the PRD
//
// <board> is blueprint | opportunity | storymap | matrix | verdict, or a path to a
// hand-composed board (a Crazy 8 file). Hand-composed boards carry no data: pass - as <data.json>.
// The output must go outside this folder, so a bake can never overwrite the engine.

const fs = require('fs');
const path = require('path');

const BOARDS = ['blueprint', 'opportunity', 'storymap', 'matrix', 'verdict'];
const FLAGS = ['--inline', '--srcdoc'];
const MARKS = ['well', 'poor', 'none', 'na'];
const VERDICTS = ['test', 'narrow', 'stop'];
const LINK = /<link[^>]*href="(?:\.\/)?engine\.css"[^>]*>/;
const BACKSLASH = String.fromCharCode(92);
const USAGE ='usage: node bake.js <board> <data.json | -> <out.html> [--inline | --srcdoc]';

class BakeError extends Error {}

function fail(message) {
  throw new BakeError(message);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// A non-empty array of objects that each carry the named text fields.
function requireRows(board, data, key, fields) {
  const rows = data[key];
  if (!Array.isArray(rows) || rows.length === 0) fail(`${board} needs a non-empty "${key}" list`);
  rows.forEach((row, i) => {
    if (!isObject(row)) fail(`${board} ${key} item ${i + 1} is not an object`);
    fields.forEach((field) => {
      if (row[field] === undefined || row[field] === null || row[field] === '') fail(`${board} ${key} item ${i + 1} is missing "${field}"`);
    });
  });
  return rows;
}

function isScore(value) {
  return Number.isFinite(value) && value >= 1 && value <= 10;
}

function checkMatrix(data) {
  const competitors = requireRows('matrix', data, 'competitors', ['name']);
  requireRows('matrix', data, 'needs', ['label']).forEach((need, i) => {
    if (!Array.isArray(need.marks)) fail(`matrix need ${i + 1} ("${need.label}") has no "marks" list`);
    if (need.marks.length !== competitors.length) fail(`matrix need ${i + 1} ("${need.label}") has ${need.marks.length} marks, expected ${competitors.length} (one per competitor)`);
    const bad = need.marks.findIndex((mark) => !MARKS.includes(mark));
    if (bad !== -1) fail(`matrix need ${i + 1} has mark "${need.marks[bad]}", expected one of ${MARKS.join(' | ')}`);
  });
}

function checkOpportunity(data) {
  requireRows('opportunity', data, 'needs', ['label']).forEach((need, i) => {
    if (!isScore(need.pain) || !isScore(need.served)) fail(`opportunity need ${i + 1} ("${need.label}") needs "pain" and "served" as numbers from 1 to 10`);
    const expected = need.pain + Math.max(0, need.pain - need.served);
    if (need.score !== expected) fail(`opportunity need ${i + 1} ("${need.label}") has score ${need.score}, the formula gives ${expected}`);
  });
}

function checkVerdict(data) {
  if (!VERDICTS.includes(data.verdict)) fail(`verdict is "${data.verdict}", expected one of ${VERDICTS.join(' | ')}`);
  if (!Number.isInteger(data.rung) || data.rung < 1 || data.rung > 5) fail(`rung is ${data.rung}, expected a whole number from 1 to 5`);
  if (typeof data.idea !== 'string' || !data.idea.trim()) fail('verdict card has no "idea"');
  // The card is a fixed size, so long text gets cut off. Stop before that happens.
  const limits = [['idea', data.idea, 110], ['read', data.read, 260], ['quote.text', (data.quote || {}).text, 220]];
  limits.forEach(([field, text, max]) => {
    if (typeof text === 'string' && text.length > max) fail(`verdict "${field}" is ${text.length} characters, the card fits about ${max}. Shorten it.`);
  });
}

function checkData(board, data) {
  if (!isObject(data)) fail(`${board} data must be a JSON object`);
  if (board === 'matrix') checkMatrix(data);
  if (board === 'opportunity') checkOpportunity(data);
  if (board === 'verdict') checkVerdict(data);
  if (board === 'blueprint') {
    requireRows('blueprint', data, 'steps', ['n', 'name']);
    if (!isObject(data.layers)) fail('blueprint needs a "layers" object');
  }
  if (board === 'storymap') {
    requireRows('storymap', data, 'activities', ['step', 'name']);
    requireRows('storymap', data, 'releases', ['id', 'label']);
  }
}

// Sets window.__D__ and answers any data-*.json fetch with it, so the renderer needs no server.
function shim(data) {
  // U+2028 and U+2029 end a line inside a script tag, so they are escaped along with '<'.
  const lineBreaks = new RegExp('[' + String.fromCharCode(0x2028, 0x2029) + ']', 'g');
  const json = JSON.stringify(data).replace(/</g, BACKSLASH + 'u003c').replace(lineBreaks, (c) => BACKSLASH + 'u' + c.charCodeAt(0).toString(16));
  return '<script>window.__D__=' + json + ';(function(){var f=window.fetch;window.fetch=function(u){' +
    "if(typeof u==='string'&&/data-[^\\/]*\\.json/.test(u)){return Promise.resolve(new Response(JSON.stringify(window.__D__)," +
    "{status:200,headers:{'Content-Type':'application/json'}}));}return f.apply(this,arguments);};})();</script>";
}

// Order matters: & first, then ". The other order double-escapes the quotes.
function escapeAttribute(html) {
  return html.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// A ready-to-paste embed: the board at its native 1920px width, scaled to a 1080px column.
// The sizes are inline, so the snippet looks right in any page, with or without the PRD's own CSS.
function frame(html, nativeHeight) {
  const scale = 0.5625;
  return '<div class="board" style="position:relative;width:1080px;max-width:100%;height:' + Math.round(nativeHeight * scale) + 'px;overflow:hidden">' +
    '<iframe scrolling="no" style="border:0;display:block;width:1920px;height:' + nativeHeight + 'px;transform-origin:top left;transform:scale(' + scale + ')" ' +
    'srcdoc="' + escapeAttribute(html) + '"></iframe></div>\n';
}

function parseArgs(argv) {
  const flags = argv.filter((arg) => arg.startsWith('-') && arg !== '-');
  const positional = argv.filter((arg) => !flags.includes(arg));
  const unknown = flags.find((flag) => !FLAGS.includes(flag));
  if (unknown) fail(`unknown option "${unknown}" (the options are ${FLAGS.join(' and ')})\n${USAGE}`);
  if (positional.length !== 3) fail(`expected 3 arguments, got ${positional.length}. Put any path with spaces in quotes.\n${USAGE}`);
  const [boardArg, dataPath, outPath] = positional;
  const srcdoc = flags.includes('--srcdoc');
  return { boardArg, dataPath, outPath: path.resolve(outPath), srcdoc, inline: srcdoc || flags.includes('--inline') };
}

function readData(dataPath) {
  let text;
  try {
    text = fs.readFileSync(dataPath, 'utf8');
  } catch (error) {
    fail(`could not read ${dataPath}: ${error.message}`);
  }
  try {
    return JSON.parse(text.replace(/^﻿/, ''));
  } catch (error) {
    return fail(`${dataPath} is not valid JSON: ${error.message}`);
  }
}

function main() {
  const { boardArg, dataPath, outPath, srcdoc, inline } = parseArgs(process.argv.slice(2));

  // A named board may be given as "verdict", "verdict.html", or the full path to the shipped renderer.
  const name = path.basename(boardArg).toLowerCase().replace(/\.html$/, '');
  const hasFolder = /[\\/]/.test(boardArg);
  const isNamed = BOARDS.includes(name) && (!hasFolder || path.dirname(path.resolve(boardArg)).toLowerCase() === __dirname.toLowerCase());
  const sourcePath = isNamed ? path.join(__dirname, name + '.html') : path.resolve(boardArg);
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) fail(`board not found: ${sourcePath} (named boards: ${BOARDS.join(', ')})`);

  // Never write into the engine's own folder: that is how a renderer or engine.css gets overwritten.
  if (path.dirname(outPath).toLowerCase() === __dirname.toLowerCase()) fail('write the output to a temp folder, not into the skill\'s assets/diagrams folder');
  if (outPath === sourcePath) fail('the output path is the board itself. Pick a different output file.');
  if (dataPath !== '-' && outPath === path.resolve(dataPath)) fail('the output path is the data file. Pick a different output file.');
  if (path.basename(outPath).toLowerCase() === 'engine.css') fail('the output file cannot be named engine.css');

  let html = fs.readFileSync(sourcePath, 'utf8');
  if (!LINK.test(html)) fail(`no engine.css <link> found in ${sourcePath}. Every board links engine.css.`);

  if (isNamed) {
    if (dataPath === '-') fail(`${name} is a data-driven board, it needs a data.json`);
    const data = readData(dataPath);
    checkData(name, data);
    if (!html.includes('</head>')) fail('no </head> in ' + sourcePath);
    html = html.replace('</head>', () => shim(data) + '</head>');
  } else if (dataPath !== '-') {
    fail('a hand-composed board carries no data. Pass - in place of the data file.');
  }

  if (inline) {
    const css = fs.readFileSync(path.join(__dirname, 'engine.css'), 'utf8');
    html = html.replace(LINK, () => '<style>' + css + '</style>');
  }

  const output = srcdoc ? frame(html, name === 'blueprint' ? 1340 : 1080) : html;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  if (!inline) fs.copyFileSync(path.join(__dirname, 'engine.css'), path.join(path.dirname(outPath), 'engine.css'));
  process.stdout.write('wrote ' + outPath + '\n');
}

try {
  main();
} catch (error) {
  process.stderr.write('bake.js: ' + error.message + '\n');
  process.exit(1);
}
