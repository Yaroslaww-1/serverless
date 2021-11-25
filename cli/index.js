const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const { BundleCommand } = require("./src/commands/bundle.command");
const { DeployCommand } = require("./src/commands/deploy.command");

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command('bundle', 'Bundle your code into deployment package', async ({ argv }) => {
      try {
        const command = new BundleCommand();
        await command.execute(
          path.join(__dirname, argv.file),
          path.join(__dirname, argv.output)
        );
      } catch (e) {
        console.log(e);
      }
    })
    .command('deploy', 'Bundle and deploy your code', async ({ argv }) => {
      try {
        const command = new DeployCommand();
        await command.execute(
          path.join(__dirname, argv.file),
          argv.app
        );
      } catch (e) {
        console.log(e);
      }
    })
    // .example('$0 bundle --file=../../test/config.json --output=../../test/output.zip')
    .argv;

checkCommands(yargs, argv, 1)

function checkCommands (yargs, argv, numRequired) {
  if (argv._ && argv._.length < numRequired) {
    yargs.showHelp();
  } else {
    // check for unknown command
  }
}