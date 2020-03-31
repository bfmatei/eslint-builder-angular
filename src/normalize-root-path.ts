import { BuilderContext } from '@angular-devkit/architect';

import { BuilderOptions } from './builder.model';

export function normalizeRootPath(options: BuilderOptions, context: BuilderContext): BuilderOptions {
  process.chdir(context.currentDirectory);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...options,
    cwd: context.workspaceRoot
  } as BuilderOptions;
}
