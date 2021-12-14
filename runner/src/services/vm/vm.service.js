const { ChildProcessVM } = require('./child-process-vm');

class VMService {
  createNewChildProcessVM() {
    const vm = new ChildProcessVM();
    return vm;
  }
}

module.exports = {
  VMService
}
