const { RunnerApiHelper } = require('../helpers/runner-api.helper');

class RunCommand {
  async execute(appName) {
    return await RunnerApiHelper.run({ appName });
  }
}

module.exports = {
  RunCommand
}
