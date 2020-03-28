
# ESLint builder for Angular  
Run [ESLint](https://eslint.org/) from Angular CLI.

## Install
1. Install ESLint: `npm install eslint --save-dev`
2. Install the builder: `npm install @bmatei/stylelint-builder-angular --save-dev`
3. Add the builder to `angular.json`:
```
"eslint": {
  "builder": "@bmatei/eslint-builder-angular:lint"
}
```
4. Run stylelint: `ng run <project>:stylelint`

## Available options
Some options correspond to the ESLint config parameters. By default, these do not override any behavior in ESLint. 
1. `cache`
    - [Reference: cache](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
2. `cacheLocation`
    - [Reference: cacheLocation](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
3. `configFile`
    - [Reference: configFile](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
4. `files`
    - Array of glob patterns to be checked.
    - Default: `["src/**/*.ts"]` 
5. `fix`
    - [Reference: fix](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
6. `format`
    - [Reference: format](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
7. `force`
    - Ignore any errors and warnings and return a success status.
8. `reportUnusedDisableDirectives`
    - [Reference: reportUnusedDisableDirectives](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
9. `silent`
    - Suppress any output from the builder.
    - Default: `false`
10. `useEslintrc`
    - [Reference: useEslintrc](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)  
