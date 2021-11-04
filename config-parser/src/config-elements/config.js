const { Function } = require("./function");

class Config {
  _functions;

  constructor(config) {
    this._functions = this._parseFunctions(config.functions);
  }

  _parseFunctions(configFunctions) {
    return Object.keys(configFunctions).map(functionName => new Function({
      handler: configFunctions[functionName].handler,
      name: functionName
    }));
  }

  get functions() {
    return this._functions;
  }
}

module.exports = {
  Config
}