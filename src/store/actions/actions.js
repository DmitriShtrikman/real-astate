import { AGREEMENTVALUE, CHECK, CLEAR_INPUTS, CURRENCYSELECT, DATABASE, LANGUAGESELECT, OBJECT, PAGEPARAM, PAGESELECT, SELECT, SORTERVALUE, TYPING } from "../types/types";

export const currencySelect = (data) => {
  return { type: CURRENCYSELECT, payload: data }
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

export const chosenObject = (data) => {
  return { type: OBJECT, payload: data }
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
    // payload: { [event.target.name]: event.target.value, check: event.target.checked }
  }
}

export const checkBox = (event) => {
  return {
    type: CHECK,
    payload: {[event.target.id]: event.target.checked }
  }
}

export const select = (event) => {
  return {
    type: SELECT,
    payload: {[event.target.id]: event.target.value }
  }
}

export const clearInput = () => {
  return {
    type: CLEAR_INPUTS,
    payload: { }
  }
}