import { buttonTemplate } from './components/button';
import { spinnerTemplate } from './components/spinner';
import { cardTemplate } from './components/card';

const templates: Record<string, string> = {
  button: buttonTemplate,
  spinner: spinnerTemplate,
  card: cardTemplate
};

export function getComponentTemplate(componentName: string): string | undefined {
  return templates[componentName.toLowerCase()];
}