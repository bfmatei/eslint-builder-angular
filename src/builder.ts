import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { BuilderOptions } from './builder.model';
import { lint } from './lint';
import { loadProjectEslint } from './load-project-eslint';

export async function builder(options: BuilderOptions, context: BuilderContext): Promise<BuilderOutput> {
  const systemRoot = context.workspaceRoot;

  process.chdir(context.currentDirectory);

  const projectName = (context.target && context.target.project) || '<???>';

  // Print formatter output only for non human-readable formats.
  const printInfo = !options.silent && options.format !== 'json';

  let status = `Running ESLint for project ${JSON.stringify(projectName)}...`;

  context.reportStatus(status);

  if (printInfo) {
    context.logger.info(status);
  }

  const projectEslint = await loadProjectEslint();

  options.cwd = systemRoot;

  const result = lint(projectEslint, options);

  if (printInfo) {
    context.logger.info(result.output);

    if (result.hasWarnings) {
      context.logger.warn('ESLint found warnings in the listed files.');
    }

    if (result.hasErrors) {
      context.logger.error('ESLint found errors in the listed files.');
    }

    if (result.isSuccess) {
      context.logger.info('All files passed linting with ESLint.');
    }
  }

  return {
    success: (options.force as boolean) || result.isSuccess
  };
}
