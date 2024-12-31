#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';
import { logger } from './utils/logger';

const program = new Command();

program
  .name('shadcn-kit')
  .description('CLI for adding shadcn components to your Next.js project')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize your project with shadcn-kit components')
  .action(init);

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(add);

program.parse();
