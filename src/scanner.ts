import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';

export interface ScanResult {
  projectName: string;
  projectPath: string;
  items: TodoItem[];
}

export interface TodoItem {
  type: 'TODO' | 'FIXME' | 'HACK';
  message: string;
  file: string;
  line: number;
  context: string;
}

/**
 * Scans a directory for project roots (containing .git or package.json)
 * and then scans each project for TODO items.
 */
export async function scanDirectory(rootPath: string, exclusions: string[]): Promise<ScanResult[]> {
  // Find all projects (folders with .git or package.json)
  const projectIndicators = await fg(['**/.git', '**/package.json'], {
    cwd: rootPath,
    onlyFiles: false,
    deep: 5, // Search deeper for project roots
    ignore: exclusions.map(e => `**/${e}/**`),
  });

  const projectRoots = Array.from(new Set(projectIndicators.map(p => path.dirname(path.join(rootPath, p)))));
  const results: ScanResult[] = [];

  for (const projectRoot of projectRoots) {
    const projectName = path.basename(projectRoot);
    const items = await scanProject(projectRoot, exclusions);
    
    if (items.length > 0) {
      results.push({
        projectName,
        projectPath: projectRoot,
        items
      });
    }
  }

  return results;
}

/**
 * Scans a single project for TODO patterns in supported file types.
 */
async function scanProject(projectPath: string, exclusions: string[]): Promise<TodoItem[]> {
  const files = await fg(['**/*.{ts,js,py,php,go,rs,c,cpp,h,java,md}'], {
    cwd: projectPath,
    ignore: [...exclusions.map(e => `**/${e}/**`), '**/node_modules/**'],
    absolute: true,
  });

  const items: TodoItem[] = [];
  const patterns = [
    { type: 'TODO', regex: /\/\/\s*TODO:?\s*(.*)/i },
    { type: 'FIXME', regex: /\/\/\s*FIXME:?\s*(.*)/i },
    { type: 'HACK', regex: /\/\/\s*HACK:?\s*(.*)/i },
    { type: 'TODO_MD', regex: /-\s*\[\s*\]\s*(.*)/i }, // Markdown tasks
  ];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        const match = line.match(pattern.regex);
        if (match) {
          items.push({
            type: (pattern.type === 'TODO_MD' ? 'TODO' : pattern.type) as any,
            message: match[1].trim(),
            file: path.relative(projectPath, file),
            line: index + 1,
            context: line.trim()
          });
        }
      }
    });
  }

  return items;
}
