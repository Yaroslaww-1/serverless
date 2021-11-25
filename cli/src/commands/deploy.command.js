const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

const { ArchiveHelper } = require("../helpers/archive.helper");
const { PathHelper } = require("../helpers/path.helpers");
const { RunnerApiHelper } = require('../helpers/runner-api.helper');

class DeployCommand {
  async execute(configPath, appName) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    const outputFolder = PathHelper.appendToPath(PathHelper.getParentFolder(), '.serverless');
    PathHelper.createDirIfNotExists(outputFolder);
    const outputPath = PathHelper.appendToPath(outputFolder, 'output.zip');

    const archive = new ArchiveHelper({ outputPath });
    await archive
      .appendFileToArchive({ filePath: config.path, fileName: 'config.json' })
      .appendFilesToArchive(config.functions.map(f => {
        const { name: fileName } = path.parse(f.handlerPath);
        return { filePath: f.handlerPath, fileName: `${fileName}.js` };
      }))
      .finalize();

    await RunnerApiHelper.deploy({ appName, packagePath: outputPath });
  }
}

module.exports = {
  DeployCommand
}
