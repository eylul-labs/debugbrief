# MVP Spec - DebugBrief

## Product Name

DebugBrief

## One-Line Promise

Turn terminal errors into AI-ready debugging briefs from VS Code.

## First User Flow

1. Developer copies or selects a failing test output, stack trace, or terminal
   error.
2. Developer runs `DebugBrief: Create Debug Brief From Selection`.
3. Extension creates a Markdown brief with:
   - short summary placeholder
   - raw error/log excerpt
   - suspected language/framework
   - detected repro command when available
   - useful AI debugging instructions
   - next steps checklist
4. Extension saves the brief to `.promptpack/debugbrief-*.md` and copies it to
   the clipboard.
5. Developer can copy the brief into Codex, Cursor, Claude Code, ChatGPT, or a
   bug report.

## Non-Goals For MVP

- No external AI API calls
- No payment integration
- No user accounts
- No telemetry
- No automatic upload of source code

## Success Criteria

- Extension compiles
- Command appears in VS Code command palette
- Selected text becomes a usable Markdown debug brief
- Generated brief is saved locally and opened in an editor tab
- Brief builder has basic unit test coverage
