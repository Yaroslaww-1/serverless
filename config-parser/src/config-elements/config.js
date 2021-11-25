const path = require("path");
const fs = require("fs");

const { Function } = require("./function");

class Config {
  _functions;
  _path;
  _dir;

  constructor({ configPath }) {
    this._path = configPath;
    this._dir = path.normalize(path.join(configPath, '..'));

    const configJson = fs.readFileSync(configPath);
    const config = JSON.parse(configJson);

    this._functions = this._parseFunctions(config.functions);
  }

  _parseFunctions(configFunctions) {
    const functionsNames = Object.keys(configFunctions);
    return functionsNames.map(functionName => new Function({
      handlerPath: path.join(this._dir, configFunctions[functionName].handler),
      name: functionName,
    }));
  }

  get functions() {
    return this._functions;
  }

  get path() {
    return this._path;
  }
}

module.exports = {
  Config
}