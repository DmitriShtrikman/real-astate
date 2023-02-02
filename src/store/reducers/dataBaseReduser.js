export const dataBaseReducer = (state = "", action) => {
    switch (action.type) {
        case 'DATABASE::FULLLOAD':
          return action.payload;
        default:
          return state;
      }
  }

  export default dataBaseReducer;