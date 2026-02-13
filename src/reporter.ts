import chalk from 'chalk';
import fs from 'fs-extra';
import type { ScanResult } from './scanner.js';

export async function report(results: ScanResult[], outputFile?: string) {
  let markdown = `# 🪦 Project Graveyard Report - ${new Date().toLocaleDateString()}

`;

  for (const project of results) {
    console.log(chalk.bold.green(`
📂 Project: ${project.projectName}`));
    console.log(chalk.dim(project.projectPath));
    
    markdown += `## 📂 ${project.projectName}
`;
    markdown += `*Path: \`${project.projectPath}\`*\n\n`;

    // Sorteer items op type
    const types = ['FIXME', 'TODO', 'HACK'];
    
    for (const type of types) {
      const items = project.items.filter(i => i.type === type);
      if (items.length > 0) {
        const color = type === 'FIXME' ? chalk.red : (type === 'TODO' ? chalk.yellow : chalk.magenta);
        console.log(`  ${color.bold(type)}:`);
        
        markdown += `### ${type}
`;

        items.forEach(item => {
          console.log(`    ${chalk.cyan(item.file)}:${chalk.white(item.line)} - ${item.message}`);
          markdown += `- [ ] **${item.file}:${item.line}**: ${item.message}
`;
        });
        markdown += '\n';
      }
    }
  }

  if (outputFile) {
    await fs.writeFile(outputFile, markdown);
    console.log(chalk.green(`
✅ Rapport opgeslagen in: ${outputFile}`));
  }

  console.log(`
${chalk.blue.bold('Totaal gevonden:')} ${results.reduce((acc, curr) => acc + curr.items.length, 0)} items in ${results.length} projecten.
`);
}
