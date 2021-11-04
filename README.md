# Serverless (lambda functions clone)

An application for running your serverless functions.

## Getting Started

1. You can find test data in **test** folder.
2. Run `node index.js --file=../test/config.json --output=../test/output.zip` to bundle all your code into single deployment archive in **bundler** folder.
3. Run *runner server* using `npm run start` in **runner** folder.
4. Upload your archive to server. Automatic deploying is still in progress, but you can use API (please refer to postman collection). 
5. Call `/run` API to execute your deployed function.

