const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

const { ArchiveHelper } = require("../helpers/archive.helper");

class BundleCommand {
  async execute(configPath, outputPath) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    const archive = new ArchiveHelper({ outputPath });
    await archive
      .appendFileToArchive({ filePath: config.path, fileName: 'config.json' })
      .appendFileToArchive({ filePath: config.function.handlerPath, fileName: `${path.parse(f.handlerPath).name}.js` })
      .finalize();
  }
}

module.exports = {
  BundleCommand
}
