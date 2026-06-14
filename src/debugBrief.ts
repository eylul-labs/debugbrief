export type DebugBriefInput = {
  input: string;
  fileName: string;
  workspaceName: string;
  relatedFiles?: RelatedFile[];
  generatedAt?: Date;
};

export type RelatedFile = {
  path: string;
  language: string;
  content: string;
};

export function buildDebugBrief({
  input,
  fileName,
  workspaceName,
  relatedFiles = [],
  generatedAt = new Date()
}: DebugBriefInput): string {
  const detected = detectSignals(input, fileName);
  const command = detectReproductionCommand(input);
  const excerpt = fence(input.trim());

  return `# DebugBrief

Generated: ${generatedAt.toISOString()}

## Goal

Fix the failure below. Explain the likely root cause, propose the smallest safe
change, and include verification steps.

## Workspace

- Workspace: ${workspaceName}
- Source file/log: ${fileName}
- Detected signals: ${detected.join(', ') || 'none yet'}

## Likely Reproduction Command

\`\`\`bash
${command ?? 'Unknown yet. Infer from the log if possible, otherwise ask for it.'}
\`\`\`

## Error Or Log Excerpt

\`\`\`text
${excerpt}
\`\`\`

${formatRelatedFiles(relatedFiles)}

## Instructions For The AI Coding Agent

1. Identify the likely failing component from the assertion, stack trace, or
   compiler error.
2. Ask for missing context only if required.
3. Prefer a minimal fix over broad refactors.
4. Include the exact test or command to verify the fix.
5. Mention any risk, migration, or compatibility concern.

## Suggested First Checks

- Look for the first meaningful error, not only the final process exit.
- Compare expected vs actual output when this is a test failure.
- Check recent changes around the file or symbol named in the stack trace.
- Preserve existing user changes and avoid unrelated refactors.

## Notes

- Do not assume unrelated files are safe to edit.
- If this is a test failure, start from the assertion and stack trace.
- If this is a type/build failure, start from the first compiler diagnostic.
`;
}

export function detectSignals(input: string, fileName: string): string[] {
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
  if (text.includes('error ts')) signals.push('typescript-diagnostic');

  return [...new Set(signals)];
}

export function detectReproductionCommand(input: string): string | null {
  const lines = input.split(/\r?\n/).map((line) => line.trim());
  const commandPatterns = [
    /^(npm|pnpm|yarn|bun)\s+(run\s+)?(test|build|lint|typecheck|check)\b.*$/,
    /^npx\s+(jest|vitest|tsc|eslint)\b.*$/,
    /^pytest\b.*$/,
    /^python\s+-m\s+pytest\b.*$/,
    /^go\s+test\b.*$/,
    /^cargo\s+(test|build|check)\b.*$/,
    /^dotnet\s+test\b.*$/
  ];

  for (const line of lines) {
    const normalized = line.replace(/^\$+\s*/, '');

    if (commandPatterns.some((pattern) => pattern.test(normalized))) {
      return normalized;
    }
  }

  return null;
}

function fence(value: string): string {
  return value.replace(/```/g, "'''");
}

function formatRelatedFiles(files: RelatedFile[]): string {
  if (files.length === 0) {
    return `## Related Source Context

No related source files were attached.
`;
  }

  const sections = files.map((file) => {
    return `### ${file.path}

\`\`\`${file.language}
${fence(file.content)}
\`\`\``;
  });

  return `## Related Source Context

${sections.join('\n\n')}
`;
}
