const fs = require('fs');
const path = require("path");
const extract = require('extract-zip');

class UserDataService {
  _dataDirPath;

  constructor() {
    this._dataDirPath = path.join(__dirname, "..", "..", "..", "data");
  }

  async createDataFolderIfNotExists(userId) {
    const userDataDir = this.getUserDataDirPath(userId);
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir);
    }
  }

  getUserDataDirPath(userId) {
    return path.join(this._dataDirPath, `${userId}`);
  }

  getUserDataDeploymentPackagePath(userId) {
    return path.join(this._dataDirPath, `${userId}`, 'deploymentPackage.zip');
  }

  async extractUserDeploymentPackage(userId) {
    await extract(
      this.getUserDataDeploymentPackagePath(userId),
      { dir: this.getUserDataDirPath(userId) }
    );
  }
}

module.exports = {
  UserDataService
}
