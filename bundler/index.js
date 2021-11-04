const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { BundleCommand } = require("./src/commands/bundle.js");

const argv = yargs(hideBin(process.argv)).argv

const bundleCommand = new BundleCommand();

bundleCommand.execute(argv.file, argv.output);
