import { json } from '@angular-devkit/core';

import * as SchemaBuilderOptions from './schema.json';

export type BuilderOptions = typeof SchemaBuilderOptions & json.JsonObject;

export interface LintResult {
  output: string;
  isSuccess: boolean;
  hasWarnings: boolean;
  hasErrors: boolean;
}
