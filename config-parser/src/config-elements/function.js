class Function {
  _handler;
  _name;

  constructor({ name, handler }) {
    this._name = name;
    this._handler = handler;
  }

  get handler() {
    return this._handler;
  }

  get name() {
    return this._name;
  }
}

module.exports = {
  Function
}
