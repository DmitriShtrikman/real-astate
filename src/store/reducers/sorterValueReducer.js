export const sorterValueReducer = (state = "", action) => {
    switch (action.type) {
        case 'CARD::SORTERVALUE':
          return action.payload;
        default:
          return state;
      }
  }

  export default sorterValueReducer;