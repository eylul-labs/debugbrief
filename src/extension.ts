import * as vscode from 'vscode';
import { buildDebugBrief } from './debugBrief';

export function activate(context: vscode.ExtensionContext) {
  const fromSelection = vscode.commands.registerCommand(
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

      await createBriefFromRawInput({
        input: selectedText,
        fileName: editor.document.fileName,
        copyToClipboard: true
      });
    }
  );

  const fromClipboard = vscode.commands.registerCommand(
    'debugbrief.createFromClipboard',
    async () => {
      const clipboardText = (await vscode.env.clipboard.readText()).trim();

      if (!clipboardText) {
        vscode.window.showWarningMessage('Clipboard is empty. Copy an error, stack trace, or log excerpt first.');
        return;
      }

      await createBriefFromRawInput({
        input: clipboardText,
        fileName: 'clipboard',
        copyToClipboard: false
      });
    }
  );

  context.subscriptions.push(fromSelection, fromClipboard);
}

export function deactivate() {
  // No cleanup needed yet.
}

type CreateBriefArgs = {
  input: string;
  fileName: string;
  copyToClipboard: boolean;
};

async function createBriefFromRawInput(args: CreateBriefArgs): Promise<void> {
  if (looksLikeGeneratedDebugBrief(args.input)) {
    vscode.window.showWarningMessage(
      'Clipboard/selection already contains a DebugBrief. Copy the original error, log, or file path first.'
    );
    return;
  }

  const resolved = await resolveInput(args);

  if (looksLikeGeneratedDebugBrief(resolved.input)) {
    vscode.window.showWarningMessage(
      'The resolved input is already a DebugBrief. Choose the original error, log, or file path instead.'
    );
    return;
  }

  await createBrief(resolved);
}

async function createBrief({ input, fileName, copyToClipboard }: CreateBriefArgs): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  const brief = buildDebugBrief({
    input,
    fileName,
    workspaceName: workspaceFolder?.name ?? 'Unknown workspace'
  });

  const uri = await writeBrief(brief);
  const doc = await vscode.workspace.openTextDocument(uri);

  await vscode.window.showTextDocument(doc, { preview: false });
  if (copyToClipboard) {
    await vscode.env.clipboard.writeText(brief);
    vscode.window.showInformationMessage(`DebugBrief saved to ${uri.fsPath} and copied to clipboard.`);
  } else {
    vscode.window.showInformationMessage(`DebugBrief saved to ${uri.fsPath}. Clipboard was left unchanged.`);
  }
}

async function resolveInput({
  input,
  fileName,
  copyToClipboard
}: CreateBriefArgs): Promise<CreateBriefArgs> {
  const pathCandidate = input.trim();

  if (!looksLikePath(pathCandidate)) {
    return { input, fileName, copyToClipboard };
  }

  const uri = resolvePathCandidate(pathCandidate);

  if (!uri) {
    return { input, fileName, copyToClipboard };
  }

  try {
    const stat = await vscode.workspace.fs.stat(uri);

    if (stat.type !== vscode.FileType.File) {
      return { input, fileName, copyToClipboard };
    }

    const bytes = await vscode.workspace.fs.readFile(uri);
    const content = new TextDecoder().decode(bytes).trim();

    if (!content) {
      return { input, fileName, copyToClipboard };
    }

    return {
      input: content,
      fileName: uri.fsPath,
      copyToClipboard
    };
  } catch {
    return { input, fileName, copyToClipboard };
  }
}

function looksLikePath(value: string): boolean {
  if (value.includes('\n')) {
    return false;
  }

  return (
    value.startsWith('/') ||
    value.startsWith('./') ||
    value.startsWith('../') ||
    /\.(log|txt|out|err|md)$/i.test(value)
  );
}

function resolvePathCandidate(value: string): vscode.Uri | null {
  if (value.startsWith('/')) {
    return vscode.Uri.file(value);
  }

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    return null;
  }

  const normalized = value.replace(/^\.\//, '');
  return vscode.Uri.joinPath(workspaceFolder.uri, normalized);
}

function looksLikeGeneratedDebugBrief(value: string): boolean {
  const trimmed = value.trimStart();
  return trimmed.startsWith('# DebugBrief') && trimmed.includes('## Error Or Log Excerpt');
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
