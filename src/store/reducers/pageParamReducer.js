export const pageParamReducer = (state = "", action) => {
    switch (action.type) {
        case 'HEADER::PAGEPARAM':
          return action.payload;
        default:
          return state;
      }
  }

  export default pageParamReducer;