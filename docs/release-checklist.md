# Release Checklist

## Local

- Run `npm test`.
- Run `npm run package`.
- Or run both with `npm run preflight`.
- Install the generated VSIX with:

  ```bash
  code --install-extension "debugbrief-$(node -p 'require("./package.json").version').vsix" --force
  ```

- Confirm the installed version:

  ```bash
  code --list-extensions --show-versions | rg -i 'debugbrief|eylul-labs'
  ```

## Repository

- Confirm the GitHub repository is available at
  `https://github.com/eylul-labs/debugbrief`.
- Confirm the local `main` branch is pushed to `origin/main`.
- If GitHub Actions is available, add/enable CI and confirm it passes.
- Add screenshots or a demo GIF to the README or Marketplace listing.

## Marketplace

- Confirm the VS Code Marketplace publisher id is `eylul-labs`.
- Create or refresh the Marketplace access token.
- Publish with `vsce publish` after the publisher and token are ready.
- Verify the Marketplace page title, description, icon, license, and support link.
