import { BuilderOptions } from './builder.model';

const humanReadableFormatters = ['codeframe', 'compact', 'stylish', 'table', 'tap', 'unix', 'visualstudio'];

// Print formatter output only for non human-readable formats.
export function shouldPrintInfo(options: BuilderOptions): boolean {
  return !options.silent && humanReadableFormatters.includes(options.format as string);
}
