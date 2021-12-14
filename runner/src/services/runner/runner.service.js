const path = require("path");

const { ConfigParser } = require("config-parser");

const { AppDataService } = require("../app-data/app-data.service");
const { VMService } = require("../vm/vm.service");

class RunnerService {
  _vmService;
  _appDataService;
  _configParser;

  constructor() {
    this._vmService = new VMService();
    this._appDataService = new AppDataService();
    this._configParser = new ConfigParser();
  }

  async run({ appName }) {
    const appDataDirPath = this._appDataService.getAppDataDirPath(appName);
    const configPath = path.join(appDataDirPath, "config.json");
    const config = this._configParser.parse(configPath);

    const vm = this._vmService.createNewChildProcessVM();

    return await vm.run(config.function.jsContent);
  }
}

module.exports = {
  RunnerService
}
