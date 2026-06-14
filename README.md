# PromptPack

Agent-operated microbusiness experiment owned by Serdar and operated by Eylul.

## Product Thesis

PromptPack is a VS Code extension for developers who use AI coding tools such as
Codex, Cursor, Claude Code, and ChatGPT. It turns a repository, terminal error,
or coding task into clean context packs and reusable prompts.

The product starts as a local-first developer tool, then can grow into paid
templates, team workflows, and hosted licensing.

## Initial Positioning

Stop pasting random files into AI. Generate clean repo context, debug briefs,
and agent-ready prompts from VS Code.

## Current MVP

The first product surface is `DebugBrief`.

VS Code command:

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
- writes a Markdown debug brief to `.promptpack/debugbrief-*.md`
- opens the generated brief in VS Code
- copies the brief to the clipboard when using the selection command
- leaves the clipboard unchanged when using the clipboard command

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
debugbrief-0.0.2.vsix
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
