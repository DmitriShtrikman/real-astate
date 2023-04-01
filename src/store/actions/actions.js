import { AGREEMENTVALUE, CHECK, CLEAR_INPUTS, CURRENCYOBJECT, CURRENCYSELECT, DATABASE, EDITOBJECT, EDITOBJECTCHECKBOX, EDITOBJECTSELECT, LANGUAGESELECT, MAINSELECT, MAIN_RESET_INPUTS, OBJECT, PAGEPARAM, PAGESELECT, REGIONSDATABASE, REGIONSUPDATE, SEARCHCHECK, SEARCHSELECT, SEARCHTYPING, SEARCH_CLEAR_INPUTS, SECRETTYPING, SELECT, SORTERVALUE, TYPING, USERSDATABASE } from "../types/types";

export const currencySelect = (data) => {
  return { type: CURRENCYSELECT, payload: data }
};

export const currencyObject = (data) => {
  return { type: CURRENCYOBJECT, payload: data }
};

export const languageSelect = (data) => {
  return { type: LANGUAGESELECT, payload: data }
};

export const pageSelect = (data) => {
  return { type: PAGESELECT, payload: data }
};

export const pageParam = (data) => {
  return { type: PAGEPARAM, payload: data }
};

export const objectsDataBase = (data) => {
  return { type: DATABASE, payload: data }
};

export const usersDataBase = (data) => {
  return { type: USERSDATABASE, payload: data }
};

export const regionsDataBase = (data) => {
  return { type: REGIONSDATABASE, payload: data }
};

export const regionsUpdate = (data) => {
  return { type: REGIONSUPDATE, payload: data }
};

export const chosenObject = (data) => {
  return { type: OBJECT, payload: data }
};

export const chosenObjectEdit = (event) => {
  return { 
    type: EDITOBJECT, 
    payload: {[event.target.id]: event.target.value }}
};

export const chosenObjectEditCheckbox = (event) => {
  return { 
    type: EDITOBJECTCHECKBOX, 
    payload: {[event.target.id]: event.target.checked }}
};

export const chosenObjectEditSelect = (event) => {
  return { 
    type: EDITOBJECTSELECT, 
    payload: {[event.target.id]: event.target.checked }}
};

export const sorterValue = (data) => {
  return { type: SORTERVALUE, payload: data }
};

export const userAgreement = (data) => {
  return { type: AGREEMENTVALUE, payload: data }
};

export const typing = (event) => {
  return {
    type: TYPING,
    payload: {[event.target.id]: event.target.value }
  }
}

export const typingSecret = (event) => {
  return {
    type: SECRETTYPING,
    payload: {[event.target.id]: event.target.value}
  }
}

export const checkBox = (event) => {
  return {
    type: CHECK,
    payload: {[event.target.id]: event.target.checked }
  }
}

export const selectBool = (event) => {
  return {
    type: SELECT,
    payload: {[event.target.id]: Boolean(Number(event.target.value))}
  }
}

export const select = (event) => {
  return {
    type: SELECT,
    payload: {[event.target.id]: event.target.value}
  }
}

export const clearInput = () => {
  return {
    type: CLEAR_INPUTS,
    payload: {}
  }
}

export const mainSelect = (event) => {
  return {
    type: MAINSELECT,
    payload: {[event.target.id]: event.target.value}
  }
}

export const mainClearInput = () => {
  return {
    type: MAIN_RESET_INPUTS,
    payload: {"inputState":"rent", "inputCountry":"flat"}
  }
}

export const searchTyping = (event) => {
  return {
    type: SEARCHTYPING,
    payload: {[event.target.id]: event.target.value }
  }
}

export const searchCheckBox = (event) => {
  return {
    type: SEARCHCHECK,
    payload: {[event.target.id]: event.target.checked }
  }
}

export const searchSelect = (event) => {
  return {
    type: SEARCHSELECT,
    payload: {[event.target.id]: event.target.value }
  }
}

export const searchClearInput = () => {
  return {
    type: SEARCH_CLEAR_INPUTS,
    payload: {
      globalSearchInput:"",
      inputCity:"",
      inputDistrict:"",
      minPrice:-Infinity,
      maxPrice:+Infinity,
      minSqure:-Infinity,
      maxSqure:+Infinity,
      '1+1':false,
      '2+1':false,
      '3+1':false,
      heatingNo:false,
      heatingGas:false,
      heatingElectro:false,
      airYes:false,
      airNo:false,
      bath0:false,
      bath1:false,
      bath2:false,
      bath3:false,
      bath4:false,
      balkony0:false,
      balkony1:false,
      balkony2:false,
      balkony3:false,
      balkony4:false,
      balkony5:false,
      furnitureYes:false,
      furnitureNo:false,
      kitchenYes:false,
      kitchenNo:false 
    }
  }
}