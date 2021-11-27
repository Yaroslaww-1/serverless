const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const { BundleCommand } = require("./src/commands/bundle.command");
const { DeployCommand } = require("./src/commands/deploy.command");
const { RunCommand } = require("./src/commands/run.command");

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command('bundle', 'Bundle your code into deployment package', async ({ argv }) => {
      const command = new BundleCommand();
      await command.execute(
        path.join(__dirname, argv.file),
        path.join(__dirname, argv.output)
      );
    })
    .command('deploy', 'Bundle and deploy your code', async ({ argv }) => {
      const command = new DeployCommand();
      await command.execute(
        path.join(__dirname, argv.file),
        argv.app
      );
    })
    .command('run', 'Run deployed code', async ({ argv }) => {
      const command = new RunCommand();
      const result = await command.execute(
        argv.app
      );
      console.log(result);
      return result;
    })
    .argv;

checkCommands(yargs, argv, 1)

function checkCommands (yargs, argv, numRequired) {
  if (argv._ && argv._.length < numRequired) {
    yargs.showHelp();
  } else {
    // check for unknown command
  }
}