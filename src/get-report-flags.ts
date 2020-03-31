import * as eslint from 'eslint';

import { BuilderOptions, ReportFlags } from './builder.model';

export function getReportFlags(report: eslint.CLIEngine.LintReport, options: BuilderOptions): ReportFlags {
  if (options.fix) {
    return {
      hasErrors: Boolean(report.errorCount - report.fixableErrorCount),
      hasWarnings: Boolean(report.warningCount - report.fixableWarningCount)
    };
  }

  return {
    hasErrors: Boolean(report.errorCount),
    hasWarnings: Boolean(report.warningCount)
  };
}
