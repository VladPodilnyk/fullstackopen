const isTitleAndUrlDefined = (data) => {
  if (data.title === undefined || data.url === undefined) {
    return false;
  }
  return true;
};

const setLikesDefultValue = (data) => {
  const newObj = {
    ...data
  };

  if (data.likes === undefined) {
    newObj.likes = 0;
  }

  return newObj;
};

module.exports = {
  isTitleAndUrlDefined,
  setLikesDefultValue
};