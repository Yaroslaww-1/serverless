const fs = require("fs");
const { Config } = require("./config-elements/config");

class ConfigParser {
  parse(configPath) {
    if (!fs.existsSync(configPath)) {
      throw new Error("Config file not found. Please specify correct path.");
    }

    return new Config({ configPath })
  }
}

module.exports = {
  ConfigParser
}
