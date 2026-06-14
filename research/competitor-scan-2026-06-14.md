# Competitor Scan - 2026-06-14

## Summary

The broad "AI prompt/context manager for VS Code" category already has active
competition. A generic PromptPack would be hard to distinguish.

The better wedge is narrower:

> Turn terminal errors, test failures, and selected logs into an AI-ready debug
> brief with relevant repo context.

This moves the product from "another prompt manager" to "debug handoff
generator".

## Notable Competitors And Signals

- AgentContextKit
  - VS Code extension for managing AI coding agent context and instruction
    files such as `AGENTS.md`, Claude, Cursor, Codex, Roo, Windsurf, and Gemini.
  - Signal: the exact agent-context space is active and recent.
  - Source: https://marketplace.visualstudio.com/items?itemName=VladNoskov.contextkit-vscode

- Prompt Tower
  - Lets users select files and copy context to clipboard for AI chats.
  - Signal: simple context copying is already covered.
  - Source: https://marketplace.visualstudio.com/items?itemName=backnotprop.prompt-tower

- PromptCode
  - File context selection, prompt templates, generated prompts, and response
    parsing.
  - Signal: broad prompt generation already exists.
  - Source: https://github.com/cogflows/promptcode-vscode

- Akashi
  - Manages AI agent rules, prompts, instructions, and relationship graphs across
    Claude, Cursor, Codex, and Gemini.
  - Signal: prompt/rules management is becoming crowded.
  - Source: https://marketplace.visualstudio.com/items?itemName=akashi.akashi

- Prompt Compiler
  - Turns Jira stories, bugs, and tasks into repo-aware AI context packages.
  - Signal: work-item-to-context exists but appears early.
  - Source: https://marketplace.visualstudio.com/items?itemName=architect-dhruv.prompt-compiler

- Copy Groups
  - Organizes files into named groups and copies code context for AI assistants.
  - Signal: file group context copying exists.
  - Source: https://marketplace.visualstudio.com/items?itemName=GSejas.vscode-copygroups

- PromptDC
  - Prompt enhancement for Cline, Copilot, Gemini, Codex, Claude Code, and Kilo
    Code chats.
  - Signal: prompt improvement is present but low install count compared with
    bigger AI coding tools.
  - Source: https://marketplace.visualstudio.com/items?itemName=PromptDC.promptdc-vscode

## Product Implication

Do not launch as "Prompt manager for AI coding". That is too generic.

Launch as:

> DebugBrief: turn terminal errors into high-quality AI debug requests.

## Differentiation

- Start from real developer pain: failing tests, stack traces, terminal output.
- Include relevant files automatically.
- Include exact reproduction command when detected.
- Include environment and dependency clues.
- Create concise, model-specific prompts for Codex, Cursor, Claude Code, and
  ChatGPT.
- Produce a local Markdown artifact that can be attached to bug reports or AI
  agent tasks.

## MVP Recommendation

Keep the repository name `promptpack` for now, but product-facing name should be
`DebugBrief`.

