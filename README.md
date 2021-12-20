# Serverless

An application for running your serverless functions. Inspired by AWS Lambda functions and Serverless framework.

Basically this application consists of 3 modules:
1. **config-parser** - shared parser for config files
2. **cli** - contains CLI (bundle/deploy/run/...)
3. **runner** - backend that runs code

Core libraries and modules:
1. **yargs** for cli bootstrapping
2. **webpack** as a code bundler
3. **express** as a backend framework
4. **child_process** for running user code in a separate thread
4. **vm2** leverages code sandboxing

## Main usage flows

### Deploying
![image](https://user-images.githubusercontent.com/40521835/146773299-178b7e40-ec54-4dc5-9c52-67a51134f555.png)

### Running
![image](https://user-images.githubusercontent.com/40521835/146773325-1a3d855a-5675-4c52-874a-8ec667a2c7fb.png)

Also, **video** with these flows is available [on youtube](https://youtu.be/PapHJpj_zuY)

## Getting Started

1. You can find test data in **test** folder.
2. Start runner: `cd runner && npm run start`
3. Run `cd ./cli && node ./index.js bundle --file ../test/config.json --output ../test/output.zip` to bundle all your code into single deployment archive in **test** folder. *Optional*
4. Run `cd ./cli && node ./index.js deploy --file ../test/config.json --app test` to bundle and deploy your code.
5. Run `cd ./cli && node ./index.js run --app test` to execute your code remotely.


