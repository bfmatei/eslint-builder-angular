import * as eslint from 'eslint';

import { BuilderOptions, LintReport } from './builder.model';
import { getReportFlags } from './get-report-flags';

export function lint(projectEslint: typeof eslint, options: BuilderOptions): LintReport {
  const cliEngine = new projectEslint.CLIEngine(options as Partial<eslint.CLIEngine.Options>);

  const formatter = cliEngine.getFormatter(options.format as string);

  const report = cliEngine.executeOnFiles(options.files as string[]);

  const reportFlags = getReportFlags(report, options);

  if (options.fix) {
    eslint.CLIEngine.outputFixes(report);
  }

  return {
    output: formatter(report.results),
    ...reportFlags,
    isSuccess: options.force === true || (!reportFlags.hasWarnings && !reportFlags.hasErrors)
  };
}
