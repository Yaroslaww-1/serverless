const OkResponse = (res, response = {}) => {
  return res.status(200).send(JSON.stringify(response));
};

module.exports = {
  OkResponse
}