const webpack = require("webpack");

class WebpackHelper {
  async run({ entryFilePath, outputFolder, outputFileName }) {
    const config = {
      // mode: 'development',
      entry: {
        app: entryFilePath
      },
      target: 'node',
      output: {
        path: outputFolder,
        filename: outputFileName,
        library: {
          name: "handler",
          type: "umd"
        }
      },
    }

    // `compiler.run()` doesn't support promises yet, only callbacks
    await new Promise((resolve, reject) => {
      const compiler = webpack(config);
      compiler.run((err, stats) => {
        if (err || (stats && stats.hasErrors())) {
          reject(err);
        }

        resolve();
      });
    });
  }
}

module.exports = {
  WebpackHelper
}
