import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { BuilderOptions } from './builder.model';
import { lint } from './lint';
import { loadProjectEslint } from './load-project-eslint';
import { getShouldLog } from './get-should-log';
import { printOutput } from './print-output';
import { printInput } from './print-input';
import { normalizeRootPath } from './normalize-root-path';

export async function builder(options: BuilderOptions, context: BuilderContext): Promise<BuilderOutput> {
  const normalizedOptions = normalizeRootPath(options, context);

  const shouldLog = getShouldLog(normalizedOptions);

  printInput(shouldLog, context);

  const projectEslint = await loadProjectEslint();

  const report = lint(projectEslint, normalizedOptions);

  printOutput(shouldLog, report, context);

  return {
    success: report.isSuccess
  };
}
