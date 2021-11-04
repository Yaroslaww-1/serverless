const fs = require("fs");
const path = require("path");
const { Config } = require("./config-elements/config");

class ConfigParser {
  parse(configPath) {
    if (!fs.existsSync(configPath)) {
      throw new Error("Config file not found. Please specify correct path.");
    }

    const configDirPath = path.normalize(path.join(configPath, '..'));

    const configJson = fs.readFileSync(configPath);
    const config = JSON.parse(configJson);

    return new Config(config, configDirPath)
  }
}

module.exports = {
  ConfigParser
}
