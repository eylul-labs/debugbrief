import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'debugbrief.createFromSelection',
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showWarningMessage('Open a file or log output and select text first.');
        return;
      }

      const selectedText = editor.document.getText(editor.selection).trim();

      if (!selectedText) {
        vscode.window.showWarningMessage('Select an error, stack trace, or log excerpt first.');
        return;
      }

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      const brief = buildDebugBrief({
        input: selectedText,
        fileName: editor.document.fileName,
        workspaceName: workspaceFolder?.name ?? 'Unknown workspace'
      });

      const doc = await vscode.workspace.openTextDocument({
        content: brief,
        language: 'markdown'
      });

      await vscode.window.showTextDocument(doc, { preview: false });
      await vscode.env.clipboard.writeText(brief);
      vscode.window.showInformationMessage('DebugBrief created and copied to clipboard.');
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // No cleanup needed yet.
}

type DebugBriefInput = {
  input: string;
  fileName: string;
  workspaceName: string;
};

function buildDebugBrief({ input, fileName, workspaceName }: DebugBriefInput): string {
  const detected = detectSignals(input, fileName);
  const excerpt = fence(input);

  return `# DebugBrief

## Goal

Fix the failure below. Explain the likely root cause, propose the smallest safe
change, and include verification steps.

## Workspace

- Workspace: ${workspaceName}
- Source file/log: ${fileName}
- Detected signals: ${detected.join(', ') || 'none yet'}

## Error Or Log Excerpt

\`\`\`text
${excerpt}
\`\`\`

## Instructions For The AI Coding Agent

1. Identify the likely failing component.
2. Ask for missing context only if required.
3. Prefer a minimal fix over broad refactors.
4. Include the exact test or command to verify the fix.
5. Mention any risk, migration, or compatibility concern.

## Reproduction Command

Unknown yet. Infer from the log if possible, otherwise ask for it.

## Notes

- Do not assume unrelated files are safe to edit.
- Preserve existing user changes.
- If this is a test failure, start from the assertion and stack trace.
`;
}

function detectSignals(input: string, fileName: string): string[] {
  const text = `${fileName}\n${input}`.toLowerCase();
  const signals: string[] = [];

  if (text.includes('pytest') || text.includes('traceback')) signals.push('python');
  if (text.includes('typescript') || text.includes('tsc') || text.includes('.ts')) signals.push('typescript');
  if (text.includes('jest') || text.includes('vitest')) signals.push('javascript-test');
  if (text.includes('npm ') || text.includes('node_modules')) signals.push('node');
  if (text.includes('cargo') || text.includes('rustc')) signals.push('rust');
  if (text.includes('go test') || text.includes('panic:')) signals.push('go');
  if (text.includes('stack trace') || text.includes('exception')) signals.push('exception');
  if (text.includes('assert') || text.includes('expected') || text.includes('received')) signals.push('test-failure');

  return [...new Set(signals)];
}

function fence(value: string): string {
  return value.replace(/```/g, "'''");
}

