import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currencyObject } from "../../store/actions/actions";

export const CurrencyApi = () => {
    const dispatch = useDispatch();

    const requestCurrency = () => {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js") 
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`); 
                }                
                return response.json()
            })             
            .then(                
                (result) => {
                    dispatch(currencyObject(result.Valute))
                }
                ) 
            .catch((err) => {
                console.log(err);
            })           
    };

    useEffect(() => { 
        requestCurrency();
        }, []
    );

}