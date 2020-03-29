import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { BuilderOptions } from './builder.model';
import { lint } from './lint';
import { loadProjectEslint } from './load-project-eslint';
import { shouldPrintInfo } from './should-print-info';

export async function builder(options: BuilderOptions, context: BuilderContext): Promise<BuilderOutput> {
  const systemRoot = context.workspaceRoot;

  process.chdir(context.currentDirectory);

  const projectName = (context.target && context.target.project) || '<???>';

  const printInfo = shouldPrintInfo(options);

  let status = `Running ESLint for project ${JSON.stringify(projectName)}...`;

  context.reportStatus(status);

  if (printInfo) {
    context.logger.info(status);
  }

  const projectEslint = await loadProjectEslint();

  options.cwd = systemRoot;

  const report = lint(projectEslint, options);

  if (printInfo) {
    context.logger.info(report.output);

    if (report.hasWarnings) {
      context.logger.warn('ESLint found warnings in the listed files.');
    }

    if (report.hasErrors) {
      context.logger.error('ESLint found errors in the listed files.');
    }

    if (report.isSuccess) {
      context.logger.info('All files passed linting with ESLint.');
    }
  }

  return {
    success: options.force ? true : report.isSuccess
  };
}
