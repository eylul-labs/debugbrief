import * as vscode from 'vscode';
import { buildDebugBrief } from './debugBrief';

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

      const uri = await writeBrief(brief);
      const doc = await vscode.workspace.openTextDocument(uri);

      await vscode.window.showTextDocument(doc, { preview: false });
      await vscode.env.clipboard.writeText(brief);
      vscode.window.showInformationMessage(`DebugBrief saved to ${uri.fsPath} and copied to clipboard.`);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // No cleanup needed yet.
}

async function writeBrief(brief: string): Promise<vscode.Uri> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    const doc = await vscode.workspace.openTextDocument({
      content: brief,
      language: 'markdown'
    });
    return doc.uri;
  }

  const directory = vscode.Uri.joinPath(workspaceFolder.uri, '.promptpack');
  await vscode.workspace.fs.createDirectory(directory);

  const filename = `debugbrief-${timestamp()}.md`;
  const uri = vscode.Uri.joinPath(directory, filename);
  await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(brief));

  return uri;
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}
