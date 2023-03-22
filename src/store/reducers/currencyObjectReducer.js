export const currencyObjectReducer = (state = "", action) => {
    switch (action.type) {
        case 'HEADER::CURRENCYOBJECT':
          return action.payload;
        default:
          return state;
      }
  }

  export default currencyObjectReducer;