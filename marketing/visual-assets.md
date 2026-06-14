# Visual Assets Plan

## Icon Direction

DebugBrief uses a minimal dark icon with:

- document shape for the generated brief
- code marks for developer workflow
- lightning mark for fast debugging handoff

Current files:

- `assets/icon.svg`
- `assets/icon.png`

## Marketplace Screenshots

Required draft screenshots:

1. Error log selected in VS Code
2. Command palette showing `DebugBrief: Create Debug Brief From Selection`
3. Generated Markdown brief with:
   - likely reproduction command
   - detected signals
   - related source context

## Demo GIF Flow

1. Open `samples/typescript-build-failure.log`
2. Select the log
3. Run DebugBrief command
4. Show `.promptpack/debugbrief-*.md`
5. Highlight `Related Source Context`

