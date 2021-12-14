const path = require("path");
const fs = require("fs");

const { Function } = require("./function");

class Config {
  _path;
  _dir;

  _function;

  constructor({ configPath }) {
    this._path = configPath;
    this._dir = path.normalize(path.join(configPath, '..'));

    const configJson = fs.readFileSync(configPath);
    const config = JSON.parse(configJson);

    this._function = this._parseFunction(config.function);
  }

  _parseFunction(configFunction) {
    return new Function({
      handlerPath: path.join(this._dir, configFunction.handler),
    });
  }

  _parseDependencies(configDependencies) {
    return new Dependencies({
      packageJsonPath: path.join(this._dir, configDependencies['package.json'])
    });
  }

  get function() {
    return this._function;
  }

  get path() {
    return this._path;
  }
}

module.exports = {
  Config
}