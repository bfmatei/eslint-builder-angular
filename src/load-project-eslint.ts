import * as eslint from 'eslint';

export async function loadProjectEslint(): Promise<typeof eslint> {
  let lib;

  try {
    lib = await import('eslint');
  } catch {
    throw new Error('Unable to find ESLint. Is it installed?');
  }

  return lib;
}
