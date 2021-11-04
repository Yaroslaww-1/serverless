const path = require("path");
const { ConfigParser } = require("config-parser");

const { UserDataService } = require("../user/user-data.service");
const { VMService } = require("../vm/vm.service");

class RunnerService {
  _vmService;
  _userDataService;
  _configParser;

  constructor() {
    this._vmService = new VMService();
    this._userDataService = new UserDataService();
    this._configParser = new ConfigParser();
  }

  run(userId) {
    const userDataDirPath = this._userDataService.getUserDataDirPath(userId);
    const configPath = path.join(userDataDirPath, "config.json");
    const config = this._configParser.parse(configPath);

    const vm = this._vmService.createNewVM();
    const functionInSandbox = vm.run(config.functions[0].jsContent);
    return functionInSandbox();
  }
}

module.exports = {
  RunnerService
}
