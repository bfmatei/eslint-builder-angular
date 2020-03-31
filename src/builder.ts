import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { BuilderOptions } from './builder.model';
import { getShouldLog } from './get-should-log';
import { lint } from './lint';
import { loadProjectEslint } from './load-project-eslint';
import { normalizeRootPath } from './normalize-root-path';
import { printOutput } from './print-output';
import { printInput } from './print-input';

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
