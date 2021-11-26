const fs = require("fs");
const path = require("path");

class Function {
  _handlerPath;
  _jsContent;

  constructor({ handlerPath }) {
    this._handlerPath = handlerPath;
    this._jsContent = fs.readFileSync(handlerPath);
  }

  get handlerPath() {
    return this._handlerPath;
  }

  get jsContent() {
    return this._jsContent.toString();
  }
}

module.exports = {
  Function
}
