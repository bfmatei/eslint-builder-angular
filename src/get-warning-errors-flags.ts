import * as eslint from 'eslint';

import { Severity, WarningsErrorsFlags } from './builder.model';

const initialWarningsErrorsFlags: WarningsErrorsFlags = {
  hasWarnings: false,
  hasErrors: false
};

export function getWarningErrorsFlags(report: eslint.CLIEngine.LintReport): WarningsErrorsFlags {
  return report.results
    .map((result) => result.messages)
    .flat()
    .reduce(
      (acc, message) => ({
        hasWarnings: acc.hasWarnings || message.severity === Severity.WARN,
        hasErrors: acc.hasErrors || message.severity === Severity.ERROR
      }),
      initialWarningsErrorsFlags
    );
}
