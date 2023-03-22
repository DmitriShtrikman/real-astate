import { useSelector } from "react-redux";
import { getCurrencyObject, getCurrencyValue } from "../../store/selectors/selector";

export default function useCurrencyCoefficient() {

    const currency = useSelector(getCurrencyValue);

    const currencyValue = () => {
        switch (currency) {
            case '€':
                return 'EUR';
            case '₺':
                return 'TRY';
            default: 
                return 'USD';
        }}

    const currencyDollar = useSelector(getCurrencyObject)['USD'].Value;
    const currencyRate = useSelector(getCurrencyObject)[currencyValue()].Value;

    const currencyCoefficient = () => {
    switch (currency) {
        case '$':
            return 1;
        case '€':
            return (currencyDollar / currencyRate).toFixed(4);
        case '₺':
            return (currencyDollar / currencyRate * 10).toFixed(4);
        case '₽':
            return currencyDollar.toFixed(4);
        default: 
            return 1;
    }}

    return currencyCoefficient()
}
