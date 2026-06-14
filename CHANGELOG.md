# Changelog

## 0.0.8

- Remove local machine-specific paths from public documentation.

## 0.0.7

- Move package metadata to the `eylul-labs` GitHub/Marketplace namespace.

## 0.0.6

- Remove private package flag for future marketplace publishing.
- Add release checklist for repository and marketplace steps.
- Keep CI documented but disabled until GitHub Actions is available on the
  publisher account.

## 0.0.5

- Add generated DebugBrief marketplace icon.
- Add visual asset and demo checklist.

## 0.0.4

- Switch package license metadata and LICENSE file to MIT.
- Add marketplace metadata: keywords, repository, homepage, bugs, and gallery
  banner.
- Add SUPPORT.md.
- Clean README for marketplace-readiness.

## 0.0.3

- Attach related source context when DebugBrief can resolve file paths mentioned
  in the error log.
- Add fenced source snippets under `Related Source Context`.
- Limit attached source context to a small local-first bundle.

## 0.0.2

- Read copied or selected local file paths as log content.
- Prevent nested DebugBrief generation when clipboard/selection already contains
  a generated brief.
- Stop overwriting the clipboard when using
  `DebugBrief: Create Debug Brief From Clipboard`.

## 0.0.1

- Initial DebugBrief MVP.
- Create AI-ready debug briefs from selected VS Code text.
- Create AI-ready debug briefs from clipboard text.
- Detect common reproduction commands including `npm test`, `pytest`,
  `go test`, `cargo test`, and `dotnet test`.
- Detect basic project/error signals such as Python, TypeScript, Node, test
  failures, exceptions, and compiler diagnostics.
- Save generated briefs to `.promptpack/debugbrief-*.md`.
- Copy generated briefs to the clipboard.
