export const languageReducer = (state = "rus", action) => {
    switch (action.type) {
        case 'HEADER::LANGUAGESELECT':
          return action.payload;
        default:
          return state;
      }
  }

  export default languageReducer;