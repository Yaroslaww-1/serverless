const _  = require("lodash");

// Wait one second and return array of numbers
const queryDatabase = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3]);
    }, 1000);
  })
}

const compute = async () => {
  const data = await queryDatabase();
  const computeResult = _.sum(data);
  return `Compute result is ${computeResult}`;
}

module.exports = {
  handler: compute
}