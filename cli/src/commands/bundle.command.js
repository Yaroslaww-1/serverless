const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

const { ArchiveHelper } = require("../helpers/archive.helper");
const { PathHelper } = require("../helpers/path.helpers");
const { RunnerApiHelper } = require('../helpers/runner-api.helper');
const { WebpackHelper } = require('../helpers/webpack.helper');

class BundleCommand {
  async execute(configPath, outputPath) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    const outputFolder = outputPath;
    PathHelper.createDirIfNotExists(outputFolder);
    outputPath = PathHelper.appendToPath(outputFolder, 'output.zip');

    const webpack = new WebpackHelper();
    await webpack.run({
      entryFilePath: config.function.handlerPath,
      outputFolder,
      outputFileName: 'function.js'
    });

    const archive = new ArchiveHelper({ outputPath });
    await archive
      .appendFileToArchive({ filePath: config.path, fileName: 'config.json' })
      .appendFileToArchive({
        filePath: path.join(outputFolder, 'function.js'),
        fileName: `${path.parse(config.function.handlerPath).name}.js`
      })
      .finalize();
    
    console.log(`Files bundled successfully. Output path is ${outputPath}`);
  }
}

module.exports = {
  BundleCommand
}
