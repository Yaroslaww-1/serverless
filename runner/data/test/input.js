const queryDatabase = () => {
  return [1, 2, 3];
}

const helloWorld = () => {
  const data = queryDatabase();
  const computeResult = data.reduce((a, b) => a + b, 0);
  return `Compute result is ${computeResult}`;
}

module.exports = helloWorld;
