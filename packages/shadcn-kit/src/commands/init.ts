import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';

export async function init() {
  try {
    // Check if project has Next.js installed
    const hasNextJs = fs.existsSync('./node_modules/next');
    if (!hasNextJs) {
      logger.info('Next.js not found. Installing...');
      execSync('npm install next@latest react@latest react-dom@latest', { stdio: 'inherit' });
    }

    // Install required dependencies
    logger.info('Installing dependencies...');
    execSync('npm install clsx tailwind-merge tailwindcss postcss autoprefixer --save-dev', { stdio: 'inherit' });
    
    // Initialize Tailwind if not already initialized
    if (!fs.existsSync('./tailwind.config.js')) {
      execSync('npx tailwindcss init -p', { stdio: 'inherit' });
      
      // Update tailwind.config.js
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
      
      fs.writeFileSync('./tailwind.config.js', tailwindConfig);
    }

    // Create necessary directories
    const directories = [
      'components/ui',
      'lib/utils',
    ];

    directories.forEach(dir => {
      fs.ensureDirSync(dir);
    });

    // Add utility functions
    const utilsContent = `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}`;

    fs.writeFileSync(
      path.join(process.cwd(), 'lib/utils/cn.ts'),
      utilsContent
    );

    logger.success('Project initialized successfully');
    logger.info('\nYou can now add components using:');
    logger.info('npx shadcn-kit add <component>');

  } catch (error) {
    logger.error('Error initializing project:', error);
    process.exit(1);
  }
}
