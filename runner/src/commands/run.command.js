const path = require("path");

const { BadRequestResponse, OkResponse } = require("../api/responses");
const { RunnerService } = require("../services/runner/runner.service");

class RunCommand {
  _runnerService;

  constructor() {
    this._runnerService = new RunnerService();
  }

  async handle(req, res) {
    try {
      const userId = 1; //TODO: replace by actual user id
      
      const result = this._runnerService.run(userId);

      return OkResponse(res, { result });
    } catch (e) {
      console.error(e);
      return BadRequestResponse(res, e.message);
    }
  }
}

module.exports = {
  RunCommand
}
