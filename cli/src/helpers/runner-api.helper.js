const fetch = require("node-fetch");
var FormData = require('form-data');
const fs = require("fs");

class RunnerApiHelperClass {
  _apiUrl;

  constructor({ apiUrl }) {
    this._apiUrl = apiUrl;
  }

  async deploy({ appName, packagePath }) {
    const form = new FormData();
    const {size} = fs.statSync(packagePath);
    const deploymentPackage = fs.readFileSync(packagePath);
    form.append('deploymentPackage', deploymentPackage);
    form.append('appName', appName);
    const response = await fetch(`${this._apiUrl}/deploy`, {
      method: 'POST',
      body: form
    });
    const data = await response.json();
    return data;
  }
}

const RunnerApiHelper = new RunnerApiHelperClass({ apiUrl: "http://localhost:3000" });

module.exports = {
  RunnerApiHelper
}
