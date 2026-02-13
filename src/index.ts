import { Command } from 'commander';
import { scanDirectory } from './scanner.js';
import { report } from './reporter.js';
import chalk from 'chalk';
import path from 'path';

const program = new Command();

program
  .name('pgs')
  .description('Project Graveyard Scanner - Find all TODOs across your projects')
  .version('1.0.0')
  .argument('[dir]', 'Directory to scan', process.cwd())
  .option('-e, --exclude <dirs>', 'Comma separated list of directories to exclude', 'node_modules,dist,build,.git')
  .option('-o, --output <file>', 'Output file (Markdown format)')
  .action(async (dir, options) => {
    const scanPath = path.resolve(dir);
    const exclusions = options.exclude.split(',');

    console.log(chalk.blue(`
🔍 Scannen van: ${scanPath}`));
    console.log(chalk.gray(`🚫 Exclusies: ${exclusions.join(', ')}
`));

    try {
      const results = await scanDirectory(scanPath, exclusions);
      
      if (results.length === 0) {
        console.log(chalk.yellow("Geen projecten met TODO's gevonden. Je graveyard is leeg! 🪦"));
        return;
      }

      await report(results, options.output);
    } catch (error) {
      console.error(chalk.red('Er is een fout opgetreden tijdens het scannen:'), error);
    }
  });

program.parse();
