const path = require("path");

const { BadRequestResponse, OkResponse } = require("../api/responses");
const { AppDataService } = require("../services/app-data/app-data.service");

class DeployCommand {
  _appDataService;

  constructor() {
    this._appDataService = new AppDataService();
  }

  async handle(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0 || !req.files.deploymentPackage) {
        return BadRequestResponse(res, "No deployment package provided");
      }

      const deploymentPackage = req.files.deploymentPackage;

      const appName = req.body.appName;
      await this._appDataService.createDataFolderIfNotExists(appName);

      await deploymentPackage.mv(this._appDataService.getAppDataDeploymentPackagePath(appName));

      await this._appDataService.extractAppDeploymentPackage(appName);

      return OkResponse(res);
    } catch (e) {
      console.error(e);
      return BadRequestResponse(res, e.message);
    }
  }
}

module.exports = {
  DeployCommand
}
