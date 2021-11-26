const fs = require("fs");

class Dependencies {
  _packageJsonPath;
  _dependencies;

  constructor({ packageJsonPath }) {
    this._packageJsonPath = packageJsonPath;

    const fileContent = fs.readFileSync(packageJsonPath);
    const content = JSON.parse(fileContent);
    this._dependencies = content.dependencies;
  }

  get packageJsonPath() {
    return this._packageJsonPath;
  }

  get dependencies() {
    return this._dependencies;
  }
}

module.exports = {
  Dependencies
}
