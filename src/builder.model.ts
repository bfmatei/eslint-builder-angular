import { json } from '@angular-devkit/core';

import * as SchemaBuilderOptions from './schema.json';

export type BuilderOptions = typeof SchemaBuilderOptions & json.JsonObject;

export interface LintReport {
  output: string;
  hasWarnings: boolean;
  hasErrors: boolean;
  isSuccess: boolean;
}

export enum Severity {
  WARN = 1,
  ERROR = 2
}

export interface WarningsErrorsFlags {
  hasWarnings: boolean;
  hasErrors: boolean;
}