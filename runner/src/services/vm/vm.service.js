const { NodeVM } = require('vm2');

class VMService {
  createNewVM() {
    const vm = new NodeVM({
      require: {
        external: true
      }
    });

    return vm;
  }
}

module.exports = {
  VMService
}
