const { NodeVM } = require('vm2');

class VMService {
  createNewVM() {
    const vm = new NodeVM({
      require: {
        external: true
      },
      sandbox: {
        setTimeout: setTimeout
      },
    });

    return vm;
  }
}

module.exports = {
  VMService
}
