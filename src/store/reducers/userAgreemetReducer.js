export const userAgreementReducer = (state = "", action) => {
    switch (action.type) {
        case 'LANDLORDS::AGREEMENTVALUE':
          return action.payload;
        default:
          return state;
      }
  }

  export default userAgreementReducer;