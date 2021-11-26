# Serverless

An application for running your serverless functions. Inspired by AWS Lambda functions and Serverless framework.

Basically this application consists of 3 modules:
1. **config-parser** - shared parser for config files
2. **cli** - contains CLI (bundle/deploy/run/...)
3. **runner** - backend that runs code

Core libraries:
1. **yargs** for cli bootstrapping
2. **express** as a backend framework
3. **vm2** leverages code sandboxing

## Getting Started

1. You can find test data in **test** folder.
2. Run `node ./cli/index.js bundle --file=../test/config.json --output=../test/output.zip` to bundle all your code into single deployment archive in **test** folder. *Optional*
3. Start runner: `cd runner && npm run start`
4. Run `node ./cli/index.js deploy --file=../test/config.json --app=test` to bundle and deploy your code.
5. Run `node ./cli/index.js run --app=test` to execute your code remotely.

