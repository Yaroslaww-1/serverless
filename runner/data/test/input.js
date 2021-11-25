const queryDatabase = () => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve([1, 2, 3]);
    }, 1000);
  })
}

const helloWorld = async () => {
  const data = await queryDatabase();
  const computeResult = data.reduce((a, b) => a + b, 0);
  return `Compute result is ${computeResult}`;
}

module.exports = helloWorld;
