import fs from 'fs-extra';
import path from 'path';
import { getComponentTemplate } from '../templates';
import { logger } from '../utils/logger';

export async function add(componentName: string) {
  try {
    const template = getComponentTemplate(componentName);
    
    if (!template) {
      logger.error(`Component '${componentName}' not found`);
      logger.info('\nAvailable components:');
      logger.info('- button\n- spinner\n- card');
      process.exit(1);
    }

    const componentPath = path.join(process.cwd(), 'components/ui', `${componentName}.tsx`);
    
    // Check if component already exists
    if (fs.existsSync(componentPath)) {
      logger.warn(`Component '${componentName}' already exists`);
      process.exit(1);
    }

    // Write component file
    fs.writeFileSync(componentPath, template);

    logger.success(`Added ${componentName} component`);
    logger.info(`\nImport it in your code:`);
    logger.info(`import { ${componentName} } from '@/components/ui/${componentName}'`);

  } catch (error) {
    logger.error('Error adding component:', error);
    process.exit(1);
  }
}