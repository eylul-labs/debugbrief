# Release Checklist

## Local

- Run `npm test`.
- Run `npm run package`.
- Install the generated VSIX with:

  ```bash
  code --install-extension debugbrief-0.0.6.vsix --force
  ```

- Confirm the installed version:

  ```bash
  code --list-extensions --show-versions | rg -i 'debugbrief|serdar-ai'
  ```

## Repository

- Create the GitHub repository at `https://github.com/serdar-ai/debugbrief`.
- Push the local `main` branch.
- Confirm the CI workflow passes.
- Add screenshots or a demo GIF to the README or Marketplace listing.

## Marketplace

- Confirm the VS Code Marketplace publisher id is `serdar-ai`.
- Create or refresh the Marketplace access token.
- Publish with `vsce publish` after the publisher and token are ready.
- Verify the Marketplace page title, description, icon, license, and support link.
