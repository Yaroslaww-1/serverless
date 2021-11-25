const fs = require("fs");
const path = require("path");
class Function {
  _handlerPath;
  _name;
  _jsContent;

  constructor({ name, handlerPath }) {
    this._name = name;
    this._handlerPath = handlerPath;
    this._jsContent = fs.readFileSync(handlerPath);
  }

  get handlerPath() {
    return this._handlerPath;
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
