const fs = require("fs");
const path = require("path");
class Function {
  _handler;
  _name;
  _jsContent;

  constructor({ name, handler, configDirPath }) {
    this._name = name;
    this._handler = handler;
    this._jsContent = fs.readFileSync(path.join(configDirPath, handler));
  }

  get handler() {
    return this._handler;
  }

  get name() {
    return this._name;
  }

  get jsContent() {
    return this._jsContent.toString();
  }
}

module.exports = {
  Function
}
