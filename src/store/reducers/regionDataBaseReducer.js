export const regionDataBaseReducer = (state = "", action) => {
    switch (action.type) {
        case 'REGIONSDATABASE::FULLLOAD':
          return action.payload;
        default:
          return state;
      }
  }

  export default regionDataBaseReducer;