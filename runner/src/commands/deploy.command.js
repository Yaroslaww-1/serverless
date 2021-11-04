const path = require("path");

const { BadRequestResponse, OkResponse } = require("../api/responses");
const { UserDataService } = require("../services/user/user-data.service");

class DeployCommand {
  _userDataService;

  constructor() {
    this._userDataService = new UserDataService();
  }

  async handle(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0 || !req.files.deploymentPackage) {
        return BadRequestResponse(res, "No deployment package provided");
      }

      const deploymentPackage = req.files.deploymentPackage;

      const userId = 1; //TODO: replace by actual user id
      await this._userDataService.createDataFolderIfNotExists(userId);

      await deploymentPackage.mv(this._userDataService.getUserDataDeploymentPackagePath(userId));

      await this._userDataService.extractUserDeploymentPackage(userId);

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
