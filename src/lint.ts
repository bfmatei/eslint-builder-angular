import * as eslint from 'eslint';

import { BuilderOptions, LintReport } from './builder.model';
import { getWarningErrorsFlags } from './get-warning-errors-flags';

export function lint(projectEslint: typeof eslint, options: BuilderOptions): LintReport {
  const cliEngine = new projectEslint.CLIEngine(options as Partial<eslint.CLIEngine.Options>);

  const formatter = cliEngine.getFormatter(options.format as string);

  const report = cliEngine.executeOnFiles(options.files as string[]);

  const warningErrorsFlags = getWarningErrorsFlags(report);

  return {
    output: formatter(report.results),
    ...warningErrorsFlags,
    isSuccess: !warningErrorsFlags.hasWarnings && !warningErrorsFlags.hasErrors
  };
}
