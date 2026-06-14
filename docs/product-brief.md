# Product Brief

## Problem

AI coding tools are powerful, but developers still waste time preparing context:

- deciding which files to paste
- explaining repo structure repeatedly
- turning terminal errors into useful debug prompts
- writing review prompts for pull requests
- keeping project instructions consistent across tools

Bad context creates bad AI output.

## Audience

Primary:

- solo developers using Cursor, Codex, Claude Code, ChatGPT, or similar tools
- freelance developers who jump across many repos
- small teams adopting AI coding agents

Secondary:

- technical founders
- consultants
- agencies building software for clients

## Current Decision

Initial broad idea was "PromptPack", but competitor scan shows generic AI
prompt/context management is already active. The first product wedge should be
more specific:

> DebugBrief: turn terminal errors, test failures, and selected logs into
> AI-ready debug briefs.

`PromptPack` can remain the umbrella project name. `DebugBrief` should be the
first sellable product surface.

## MVP Promise

Turn a failing terminal output into a useful AI debugging request in under 30
seconds.

## MVP Features

- Generate debug prompt from selected terminal/log text
- Detect likely language/framework/test runner
- Include relevant nearby files or selected files
- Include reproduction command when available
- Save debug brief as Markdown
- Copy to clipboard or save to `.promptpack/`
- Generate repository context pack as secondary command
- Generate `AGENTS.md` starter as secondary command

## Paid Expansion

- Advanced debug templates
- Model-specific prompt modes
- Team prompt/debug brief libraries
- Team prompt libraries
- License-gated pro commands
- GitHub Actions context pack generator
- Web dashboard for shared prompt packs

## Initial Pricing Hypothesis

- Free: basic context pack and limited templates
- Pro: $9/month or $39 lifetime launch price
- Team: $19/month
