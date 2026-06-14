const assert = require('node:assert/strict');
const test = require('node:test');
const {
  buildDebugBrief,
  detectReproductionCommand,
  detectSignals
} = require('../dist/debugBrief');

test('detects npm test command', () => {
  const command = detectReproductionCommand(`
$ npm test
Expected true to be false
`);

  assert.equal(command, 'npm test');
});

test('detects TypeScript and test signals', () => {
  const signals = detectSignals('error TS2345: expected string received number', 'src/index.ts');

  assert.ok(signals.includes('typescript'));
  assert.ok(signals.includes('test-failure'));
  assert.ok(signals.includes('typescript-diagnostic'));
});

test('builds a markdown debug brief', () => {
  const brief = buildDebugBrief({
    input: 'pytest tests/test_app.py\nAssertionError: expected 2 got 3',
    fileName: 'test-output.log',
    workspaceName: 'demo',
    generatedAt: new Date('2026-06-14T10:00:00.000Z')
  });

  assert.match(brief, /# DebugBrief/);
  assert.match(brief, /pytest tests\/test_app.py/);
  assert.match(brief, /Detected signals: python, test-failure/);
});
