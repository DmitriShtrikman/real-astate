import { combineReducers } from "redux";
import { currencyObjectReducer } from "./currencyObjectReducer";

import currencyReducer from "./currencyReducer";
import dataBaseReducer from "./dataBaseReduser";
import landLordReducer from "./landLordReducer";
import languageReducer from "./languageReducer";
import mainSearchReducer from "./mainSearchReducer";
import objectReducer from "./objectReducer";
import pageParamReducer from "./pageParamReducer";
import pageReducer from "./pageReducer";
import regionDataBaseReducer from "./regionDataBaseReducer";
import searchReducer from "./searchReduser";
import sorterValueReducer from "./sorterValueReducer";
import userAgreementReducer from "./userAgreemetReducer";

const rootReducer = combineReducers ({
    currency: currencyReducer,
    currencyObject: currencyObjectReducer,
    languge: languageReducer,
    page: pageReducer,
    pageParam: pageParamReducer,
    fullDataBase: dataBaseReducer,
    chosenObject: objectReducer,
    sorterValue: sorterValueReducer,
    agreementValue: userAgreementReducer,
    formInput: landLordReducer,
    searchInput: searchReducer,
    mainSearchInput: mainSearchReducer,
    regions: regionDataBaseReducer,
});

export default rootReducer;