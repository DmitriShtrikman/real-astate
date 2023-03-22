export const mainSearchReducer = (state = "", action) => {
    switch (action.type) {
      case 'MAIN::SELECT':
        return { ...state, ...action.payload }
      case 'MAIN::RESET_INPUTS':
        return action.payload;
          default:
            return state;
        }
    }
  
export default mainSearchReducer;