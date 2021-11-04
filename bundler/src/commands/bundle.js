const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const { ConfigParser } = require("config-parser");

class BundleCommand {
  _configDirPath;
  _bundlerRootDirPath;
  _configPath;

  execute(configPath, outputPath) {
    const parser = new ConfigParser();
    const config = parser.parse(configPath);

    this._configPath = configPath;
    this._configDirPath = configPath.substring(0, configPath.lastIndexOf('/'));
    this._bundlerRootDirPath = path.join(__dirname, "..", "..");

    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.pipe(output);

    this._appendFunctionsToArchive(archive, config);
    this._appendConfigToArchive(archive);

    archive.finalize();
  }

  _appendFunctionsToArchive(archive, config) {
    config.functions.forEach(f => {
      const functionHandlerPath = path.join(this._bundlerRootDirPath, this._configDirPath, f.handler);
      archive.file(functionHandlerPath, { name: `${f.name}.js` });
    });
  }

  _appendConfigToArchive(archive) {
    archive.file(path.join(this._bundlerRootDirPath, this._configPath), { name: 'config.json' });
  }
}

module.exports = {
  BundleCommand
}
