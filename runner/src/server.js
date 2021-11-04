const express = require('express');
const fileUpload = require('express-fileupload');

const { DeployCommand } = require('./commands/deploy.command');
const { RunCommand } = require('./commands/run.command');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/deploy', async (req, res) => {
  const command = new DeployCommand();
  await command.handle(req, res)
})

app.post('/run', async (req, res) => {
  const command = new RunCommand();
  await command.handle(req, res)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});