import * as eslint from 'eslint';

import { BuilderOptions, LintResult } from './builder.model';

enum Severity {
  WARN = 1,
  ERROR = 2
}

export function lint(projectEslint: typeof eslint, options: BuilderOptions): LintResult {
  const cliEngine = new projectEslint.CLIEngine(options as Partial<eslint.CLIEngine.Options>);

  const formatter = cliEngine.getFormatter(options.format as string);

  const report = cliEngine.executeOnFiles(options.files as string[]);

  const warningErrorsFlags = report.results.map((result) => result.messages).flat().reduce(
    (acc, message) => ({
      hasWarnings: acc.hasWarnings || message.severity === Severity.WARN,
      hasErrors: acc.hasErrors || message.severity === Severity.ERROR
    }),
    {
      hasWarnings: false,
      hasErrors: false
    }
  );

  return {
    output: formatter(report.results),
    ...warningErrorsFlags,
    isSuccess: !warningErrorsFlags.hasWarnings && !warningErrorsFlags.hasErrors
  };
}
