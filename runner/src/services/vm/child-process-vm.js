const cp = require("child_process");
const path = require("path");

class ChildProcessVM {
  run(jsCode) {
    const functionChildProcess = cp.fork(path.join(__dirname, "./child-process.js"));
    const FUNCTION_RUN_TIMEOUT = 30 * 1000; //30s
    const functionChildProcessKillTimeout = setTimeout(() => { functionChildProcess.kill(9) }, FUNCTION_RUN_TIMEOUT);

    return new Promise((resolve, reject) => {
      functionChildProcess.on('message', message => {
        if (message.type == 'finished') {
          clearTimeout(functionChildProcessKillTimeout);
          resolve(message.returnValue);
        }

        if (message.type == 'error') {
          clearTimeout(functionChildProcessKillTimeout);
          resolve(message.error);
        }
      });

      functionChildProcess.on('exit', (code, message) => {
        if (code !== 0) resolve('Execution halted unexpectedly!');
      });
  
      functionChildProcess.send({ code: jsCode });
    });
  }
}

module.exports = {
  ChildProcessVM
}
