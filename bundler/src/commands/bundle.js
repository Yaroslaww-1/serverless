const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

class BundleCommand {
  execute(configPath, outputPath) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.pipe(output);

    this._appendFunctionsToArchive(configPath, config, archive);

    archive.finalize();
  }

  _appendFunctionsToArchive(configPath, config, archive) {
    const configDirPath = configPath.substring(0, configPath.lastIndexOf('/'));
    const bundlerRootDirPath = path.join(__dirname, "..", "..");

    config.functions.forEach(f => {
      const functionHandlerPath = path.join(bundlerRootDirPath, configDirPath, f.handler);
      archive.file(functionHandlerPath, { name: `${f.name}.js` });
    });
  }
}

module.exports = {
  BundleCommand
}
