export const objectReducer = (state = "", action) => {
    switch (action.type) {
        case 'CARD::OBJECT':
          return action.payload;
        case 'CARD::EDITOBJECT':
          console.log(action.payload )
          return { ...state, ...action.payload };
        case 'CARD::EDITOBJECTCHECKBOX':
          return { ...state, ...action.payload };
        default:
          return state;
      }
  }

  export default objectReducer;