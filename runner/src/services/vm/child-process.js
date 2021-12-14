const { NodeVM } = require("vm2");

const runVM = async jsCode => {
  const nodeVM = new NodeVM({
    require: {
      external: true
    },
    sandbox: {
      setTimeout: setTimeout
    },
  });
  const functionExports = nodeVM.run(jsCode);
  return await functionExports.handler();
}

const sendFinished = returnValue => {
  process.send({
    type: 'finished',
    returnValue
  });
}

const sendError = error => {
  console.error(error);
  process.send({
    type: 'error',
    error: error.message
  });
  process.exit();
}

try {
  if (typeof require === 'undefined' && require.main !== module) {
    throw new Error(`typeof require === 'undefined' OR require.main !== module`);
  }

  (async () => {
    process.on('message', async (message) => {
      if (message.code) {
        try {
          const result = await runVM(message.code);
          sendFinished(result);
        } catch (e) {
          sendError(e);
        }
      }
    });
  })();
} catch (e) {
  sendError(e);
}
 