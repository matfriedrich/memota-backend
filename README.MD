# memota-backend

Typescript Node Express backend for IOTA crypto web applications. 

Specifically for "Memonta", a work in progress demo application which can be found in a 
seperate repo: https://github.com/matfriedrich/memota-frontend

Developed in Jetbrains Webstorm IDE, project files are checked in. 

## Install
run `npm install` in root folder.

## Development server
### Environment Variables
required environment variables are:
SEED: the seed to be used for the application(no authetication etc yet, just one static seed)
 
### Run
Run `run dev` run-config in Webstorm for a dev server. 

Dev server will run at `localhost:3000`
WebSocket will run at `localhost:3001`

Code changes automagically trigger a server restart (no code hot-swap unfortunately :=(  )


## Debugging

Run `Attach` run-config in Webstorm to attach debugger to running dev server. 

## Linting
tslint is configured in 'recommended' mode: https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts

The only modification done, is to allow console.log statements.

Modifications to the linting config can be done in 'tslint.json'.

### Webstorm integration

Webstorm integrates TsLint and displays linting error in the editor, as well as on commit when 'Perform code analysis' 
is checked. 

### Pre-commit hook
Husky is used as a pre-commit hook tool. With it's help, TsLint is called and commiting with linting errors is not
 possible.
 https://www.npmjs.com/package/husky 
 
 
