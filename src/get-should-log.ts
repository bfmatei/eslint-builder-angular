import { BuilderOptions } from './builder.model';

const humanReadableFormatters = ['codeframe', 'compact', 'stylish', 'table', 'tap', 'unix', 'visualstudio'];

export function getShouldLog(options: BuilderOptions): boolean {
  return !options.silent && (!options.format || humanReadableFormatters.includes(options.format as string));
}
