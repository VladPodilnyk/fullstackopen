const idMandatoryDataDefined = (data) => {
  if (data.title === undefined || data.url === undefined || data.author === undefined) {
    return false;
  }
  return true;
};

module.exports = {
  idMandatoryDataDefined,
};