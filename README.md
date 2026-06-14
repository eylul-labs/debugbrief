# DebugBrief

Turn terminal errors, stack traces, and related source files into AI-ready
debugging briefs.

## Why

AI coding tools are only as good as the context you give them. DebugBrief turns
messy logs into structured Markdown briefs you can paste into Codex, Cursor,
Claude Code, ChatGPT, or a bug report.

Instead of pasting random stack traces and hoping for the best, generate a clean
debugging handoff with the failure, likely reproduction command, detected
signals, and related source context.

## Current MVP

VS Code commands:

```text
DebugBrief: Create Debug Brief From Selection
DebugBrief: Create Debug Brief From Clipboard
```

Current behavior:

- reads selected error/log text from the active editor
- reads a selected or copied file path when it points to a local log/text file
- detects basic language/framework/test signals
- detects likely reproduction commands such as `npm test`, `pytest`, `go test`,
  and `cargo test`
- resolves local source files mentioned in the error log when possible
- writes a Markdown debug brief to `.promptpack/debugbrief-*.md`
- opens the generated brief in VS Code
- copies the brief to the clipboard when using the selection command
- leaves the clipboard unchanged when using the clipboard command

## Example

Input:

```text
$ npm run build
src/index.ts:14:19 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

DebugBrief detects:

```text
Reproduction command: npm run build
Signals: typescript, node, typescript-diagnostic
Related source: src/index.ts
```

## Local VS Code Test

1. Open this folder in VS Code:

   ```bash
   code /home/serdar/AI-products/promptpack
   ```

2. Press `F5` and choose `Run DebugBrief Extension`.
3. In the extension development window, open one of:

   ```text
   samples/python-pytest-failure.log
   samples/typescript-build-failure.log
   ```

4. Select the log text.
5. Run `DebugBrief: Create Debug Brief From Selection`.
6. Confirm that a Markdown file appears under `.promptpack/`.

You can also copy a path such as:

```text
samples/typescript-build-failure.log
```

Then run `DebugBrief: Create Debug Brief From Clipboard`; DebugBrief will read
the file content instead of treating the path itself as the log.

The selection command copies the generated Markdown to the clipboard. The
clipboard command leaves the clipboard unchanged so repeated tests do not create
nested DebugBrief output.

## Development

```bash
npm install
npm test
npm run package
```

`npm run package` creates a versioned VSIX, for example:

```text
debugbrief-0.0.3.vsix
```

The generated VSIX is ignored by git.

## Ownership Model

- Company, payment accounts, legal ownership: Serdar.
- Product strategy, implementation, docs, marketing preparation, release
  operations, support drafts, and growth workflows: Eylul.
- External/public actions such as publishing, posting, customer outreach, and ad
  spend require Serdar approval before execution.

## Workboard

- Card: `ab89b2b1-8d6c-4b4a-9084-e85795e46c7c`
- Title: `Agent-operated AI coding product: PromptPack for VS Code`
