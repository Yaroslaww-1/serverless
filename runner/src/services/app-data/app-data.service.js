const fs = require('fs');
const path = require("path");
const extract = require('extract-zip');

const { PathHelper } = require("../../helpers/path.helpers");

class AppDataService {
  _dataDirPath;

  constructor() {
    this._dataDirPath = PathHelper.appendToPath(PathHelper.getRootFolder(), "data");
    PathHelper.createDirIfNotExists(this._dataDirPath);
  }

  async createDataFolderIfNotExists(appName) {
    const appDataDir = this.getAppDataDirPath(appName);
    if (!fs.existsSync(appDataDir)) {
      fs.mkdirSync(appDataDir);
    }
  }

  getAppDataDirPath(appName) {
    return path.join(this._dataDirPath, `${appName}`);
  }

  getAppDataDeploymentPackagePath(appName) {
    return path.join(this._dataDirPath, `${appName}`, 'deploymentPackage.zip');
  }

  async extractAppDeploymentPackage(appName) {
    await extract(
      this.getAppDataDeploymentPackagePath(appName),
      { dir: this.getAppDataDirPath(appName) }
    );
  }
}

module.exports = {
  AppDataService
}
