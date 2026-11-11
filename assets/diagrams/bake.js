#!/usr/bin/env node
// bake.js: turn a vibe-check board into a file that opens with no server.
// Plain Node, no dependencies. See references/DIAGRAM-SYSTEM.md, "How to render a board".
//
//   node bake.js <board> <data.json> <out.html>            renderer + data, engine.css copied beside it
//   node bake.js <board> <data.json> <out.html> --inline   one fully self-contained file
//   node bake.js <board> <data.json> <out.html> --srcdoc   an <iframe srcdoc="..."> snippet for the PRD
//
// <board> is blueprint | opportunity | storymap | matrix | verdict, or a path to a hand-composed
// board (a Crazy 8 file). Hand-composed boards carry no data: pass - as <data.json>.

const fs = require('fs');
const path = require('path');

const BOARDS = ['blueprint', 'opportunity', 'storymap', 'matrix', 'verdict'];
const VERDICTS = ['test', 'narrow', 'stop'];
const MARKS = ['well', 'poor', 'none', 'na'];
const LINK = /<link[^>]*href="(?:\.\/)?engine\.css"[^>]*>/;

function fail(message) {
  console.error('bake.js: ' + message);
  process.exit(1);
}

function checkData(board, data) {
  if (board === 'matrix') {
    const width = (data.competitors || []).length;
    (data.needs || []).forEach((need, i) => {
      const marks = need.marks || [];
      if (marks.length !== width) fail(`matrix need ${i + 1} ("${need.label}") has ${marks.length} marks, expected ${width} (one per competitor)`);
      const bad = marks.find((m) => !MARKS.includes(m));
      if (bad) fail(`matrix need ${i + 1} has mark "${bad}", expected one of ${MARKS.join(' | ')}`);
    });
  }
  if (board === 'opportunity') {
    (data.needs || []).forEach((need, i) => {
      const expected = need.pain + Math.max(0, need.pain - need.served);
      if (need.score !== expected) fail(`opportunity need ${i + 1} ("${need.label}") has score ${need.score}, the formula gives ${expected}`);
    });
  }
  if (board === 'verdict') {
    if (!VERDICTS.includes(data.verdict)) fail(`verdict is "${data.verdict}", expected one of ${VERDICTS.join(' | ')}`);
    if (!Number.isInteger(data.rung) || data.rung < 1 || data.rung > 5) fail(`rung is ${data.rung}, expected a whole number from 1 to 5`);
    if (!data.idea) fail('verdict card has no idea');
  }
  if (board === 'blueprint' && !(data.steps || []).length) fail('blueprint has no steps');
  if (board === 'storymap' && !(data.activities || []).length) fail('storymap has no activities');
}

// Sets window.__D__ and answers any data-*.json fetch with it, so the renderer needs no server.
function shim(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return '<script>window.__D__=' + json + ';(function(){var f=window.fetch;window.fetch=function(u){' +
    "if(typeof u==='string'&&/data-[^\\/]*\\.json/.test(u)){return Promise.resolve(new Response(JSON.stringify(window.__D__)," +
    "{status:200,headers:{'Content-Type':'application/json'}}));}return f.apply(this,arguments);};})();</script>";
}

// Order matters: & first, then ". The other order double-escapes the quotes.
function escapeAttribute(html) {
  return html.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function main() {
  const args = process.argv.slice(2);
  const flags = args.filter((a) => a.startsWith('--'));
  const [board, dataPath, outPath] = args.filter((a) => !a.startsWith('--'));
  if (!board || !dataPath || !outPath) fail('usage: node bake.js <board> <data.json | -> <out.html> [--inline | --srcdoc]');

  const srcdoc = flags.includes('--srcdoc');
  const inline = srcdoc || flags.includes('--inline');
  const isNamed = BOARDS.includes(board);
  const sourcePath = isNamed ? path.join(__dirname, board + '.html') : path.resolve(board);
  if (!fs.existsSync(sourcePath)) fail(`board not found: ${sourcePath} (named boards: ${BOARDS.join(', ')})`);

  let html = fs.readFileSync(sourcePath, 'utf8');

  if (dataPath !== '-') {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (error) {
      fail(`could not read ${dataPath} as JSON: ${error.message}`);
    }
    if (isNamed) checkData(board, data);
    if (!html.includes('</head>')) fail('no </head> in ' + sourcePath);
    html = html.replace('</head>', () => shim(data) + '</head>');
  } else if (isNamed) {
    fail(`${board} is a data-driven board, it needs a data.json`);
  }

  const cssPath = path.join(__dirname, 'engine.css');
  if (inline) {
    if (!LINK.test(html)) fail('no engine.css <link> found in ' + sourcePath);
    const css = fs.readFileSync(cssPath, 'utf8');
    html = html.replace(LINK, () => '<style>' + css + '</style>');
  }

  fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
  if (!inline) fs.copyFileSync(cssPath, path.join(path.dirname(path.resolve(outPath)), 'engine.css'));

  const output = srcdoc ? '<iframe class="board" srcdoc="' + escapeAttribute(html) + '"></iframe>\n' : html;
  fs.writeFileSync(outPath, output);
  process.stdout.write('wrote ' + path.resolve(outPath) + '\n');
}

main();
