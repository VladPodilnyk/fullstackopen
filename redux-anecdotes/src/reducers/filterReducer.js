export const filterReducer = (state = "", action) => {
  switch(action.type) {
    case "SET_SEARCH_TOKEN":
      return action.payload.search_token;
    default:
      return state;
  }
};

export const createFilterAction = (searchWord) => {
  return {
    type: "SET_SEARCH_TOKEN",
    payload: {
      search_token: searchWord,
    }
  }
}