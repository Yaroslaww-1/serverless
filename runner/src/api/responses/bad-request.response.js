const BadRequestResponse = (res, errorMessage) => {
  return res.status(400).send(errorMessage);
};

module.exports = {
  BadRequestResponse
}