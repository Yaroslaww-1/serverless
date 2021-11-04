const { Function } = require("./function");

class Config {
  _functions;

  constructor(config, configDirPath) {
    this._functions = this._parseFunctions(config.functions, configDirPath);
  }

  _parseFunctions(configFunctions, configDirPath) {
    return Object.keys(configFunctions).map(functionName => new Function({
      handler: configFunctions[functionName].handler,
      name: functionName,
      configDirPath,
    }));
  }

  get functions() {
    return this._functions;
  }
}

module.exports = {
  Config
}