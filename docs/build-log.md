# Build Log

## 2026-06-14

- Created Workboard card:
  `ab89b2b1-8d6c-4b4a-9084-e85795e46c7c`
- Created project workspace at `/home/serdar/AI-products/promptpack`
- Wrote product brief, approval policy, research plan, competitor scan, MVP spec,
  and Sprint 0 notes
- Narrowed product from generic PromptPack to first product surface:
  `DebugBrief`
- Created first VS Code extension skeleton
- Implemented command:
  `DebugBrief: Create Debug Brief From Selection`
- Installed dependencies with `npm install`
- Verified TypeScript build with `npm run compile`
- Continued MVP implementation:
  - moved DebugBrief generation into `src/debugBrief.ts`
  - added `.promptpack/debugbrief-*.md` file output from the VS Code command
  - added basic reproduction command detection
  - added Node tests for signal detection, command detection, and Markdown brief
    generation
  - verified with `npm test`
- Added a second MVP usability pass:
  - command `DebugBrief: Create Debug Brief From Clipboard`
  - VS Code extension host launch config under `.vscode/`
  - sample pytest and TypeScript failure logs under `samples/`
  - README instructions for local extension testing with `F5`
  - verified again with `npm test`
- First manual MVP test succeeded from VS Code Extension Development Host using
  `samples/python-pytest-failure.log`. DebugBrief detected `python`,
  `test-failure`, and `pytest tests/test_price.py`.
- Adjusted launch config to open the project root instead of the `samples`
  folder so generated briefs use the project workspace.
- Added VSIX packaging:
  - installed `@vscode/vsce`
  - added `npm run package`
  - added `.vscodeignore`
  - added proprietary early-development `LICENSE`
  - generated `debugbrief-0.0.1.vsix`
  - remaining package warning: missing repository field, intentionally deferred
    until a public/private remote repository decision is made
- Manual clipboard test exposed a useful MVP gap: copying
  `samples/typescript-build-failure.log` produced a brief about the path string
  instead of the file contents.
- Added path-aware input resolution:
  - selected or copied absolute paths can be read as file content
  - selected or copied relative `.log`, `.txt`, `.out`, `.err`, or `.md` paths
    are resolved under the active workspace
- Manual retry exposed another UX issue: after a brief is created, the extension
  copies the brief to the clipboard, so running the clipboard command again can
  create a nested DebugBrief. Added guardrails that warn when clipboard or
  selection already contains a generated DebugBrief.
- Bumped extension to `0.0.2` so VS Code installs a clearly newer package.
- Changed clipboard command so it does not overwrite the clipboard with the
  generated brief. This prevents accidental repeated nested brief generation
  during the clipboard-path workflow.
