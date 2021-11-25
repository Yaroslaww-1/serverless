const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

const { ArchiveHelper } = require("../helpers/archive.helper");

class BundleCommand {
  execute(configPath, outputPath) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    const archive = new ArchiveHelper({ outputPath });
    archive
      .appendFileToArchive({ filePath: config.path, fileName: 'config.json' })
      .appendFilesToArchive(config.functions.map(f => {
        const { name: fileName } = path.parse(f.handlerPath);
        return { filePath: f.handlerPath, fileName: `${fileName}.js` };
      }))
      .finalize();
  }
}

module.exports = {
  BundleCommand
}
