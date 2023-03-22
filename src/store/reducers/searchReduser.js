export const searchReducer = (state = "", action) => {
    switch (action.type) {
      case 'SEARCH::TYPING':
        return { ...state, ...action.payload }
      case 'SEARCH::CHECK':
        return { ...state, ...action.payload }
      case 'SEARCH::SELECT':
        return { ...state, ...action.payload }
      case 'SEARCH::CLEAR_INPUTS':
        return action.payload;
          default:
            return state;
        }
    }
  
export default searchReducer;