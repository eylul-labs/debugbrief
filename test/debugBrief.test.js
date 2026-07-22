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

test('detects direct tool reproduction commands', () => {
  assert.equal(
    detectReproductionCommand(`
tsc --noEmit
src/index.ts:14:19 - error TS2345
`),
    'tsc --noEmit'
  );
  assert.equal(
    detectReproductionCommand(`
vitest run test/debugBrief.test.js
Expected true to be false
`),
    'vitest run test/debugBrief.test.js'
  );
  assert.equal(
    detectReproductionCommand(`
node --test test/*.test.js
not ok 1 - handles fixture
`),
    'node --test test/*.test.js'
  );
  assert.equal(
    detectReproductionCommand(`
mypy src
error: Argument 1 has incompatible type
`),
    'mypy src'
  );
});

test('detects package manager wrapped reproduction commands', () => {
  assert.equal(
    detectReproductionCommand(`
pnpm exec vitest run test/debugBrief.test.js
Expected true to be false
`),
    'pnpm exec vitest run test/debugBrief.test.js'
  );
  assert.equal(
    detectReproductionCommand(`
uv run pytest tests/test_app.py
AssertionError: expected 2 got 3
`),
    'uv run pytest tests/test_app.py'
  );
  assert.equal(
    detectReproductionCommand(`
poetry run mypy src
error: Argument 1 has incompatible type
`),
    'poetry run mypy src'
  );
  assert.equal(
    detectReproductionCommand(`
pipenv run ruff check src
F401 imported but unused
`),
    'pipenv run ruff check src'
  );
  assert.equal(
    detectReproductionCommand(`
python -m mypy src
error: Argument 1 has incompatible type
`),
    'python -m mypy src'
  );
});

test('detects TypeScript and test signals', () => {
  const signals = detectSignals('error TS2345: expected string received number', 'src/index.ts');

  assert.ok(signals.includes('typescript'));
  assert.ok(signals.includes('test-failure'));
  assert.ok(signals.includes('typescript-diagnostic'));

  const nodeSignals = detectSignals('node --test test/*.test.js\nnot ok 1', 'test/debugBrief.test.js');
  assert.ok(nodeSignals.includes('javascript-test'));
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

test('includes related source context', () => {
  const brief = buildDebugBrief({
    input: 'src/index.ts:14:19 - error TS2345',
    fileName: 'build.log',
    workspaceName: 'demo',
    relatedFiles: [
      {
        path: 'src/index.ts',
        language: 'typescript',
        content: 'sendEmail(userId, subject)'
      }
    ],
    generatedAt: new Date('2026-06-14T10:00:00.000Z')
  });

  assert.match(brief, /## Related Source Context/);
  assert.match(brief, /### src\/index\.ts/);
  assert.match(brief, /```typescript\nsendEmail/);
});
