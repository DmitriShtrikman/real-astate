export const landLordReducer = (state = "", action) => {
  switch (action.type) {
    case 'LANDLORDS::TYPING':
      return { ...state, ...action.payload }
    case 'LANDLORDS::SECRETTYPING':
      return {...state, contacts: {...state.contacts, ...action.payload}} 
    case 'LANDLORDS::CHECK':
      return { ...state, ...action.payload }
    case 'LANDLORDS::SELECT':
      return { ...state, ...action.payload }
    case 'LANDLORDS::CLEAR_INPUTS':
      return { ...action.payload }
        default:
          return state;
      }
  }

  export default landLordReducer;