const isTitleAndUrlDefined = (data) => {
  if (data.title === undefined || data.url === undefined || data.userId === undefined) {
    return false;
  }
  return true;
};

module.exports = {
  isTitleAndUrlDefined,
};