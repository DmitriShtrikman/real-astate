export const UsersDataBaseReducer = (state = "", action) => {
    switch (action.type) {
        case 'USERSDATABASE::FULLLOAD':
          return action.payload;
        default:
          return state;
      }
  }

  export default UsersDataBaseReducer;