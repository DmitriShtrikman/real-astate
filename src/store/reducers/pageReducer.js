export const pageReducer = (state = "", action) => {
    switch (action.type) {
        case 'HEADER::PAGESELECT':
          return action.payload;
        default:
          return state;
      }
  }

  export default pageReducer;