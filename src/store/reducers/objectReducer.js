export const objectReducer = (state = "", action) => {
    switch (action.type) {
        case 'CARD::OBJECT':
          return action.payload;
        default:
          return state;
      }
  }

  export default objectReducer;