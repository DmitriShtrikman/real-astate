export const currencyReducer = (state = "$", action) => {
    switch (action.type) {
        case 'HEADER::CURRENCYSELECT':
          return action.payload;
        default:
          return state;
      }
  }

  export default currencyReducer;