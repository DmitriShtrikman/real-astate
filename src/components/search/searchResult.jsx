import { useParams } from "react-router-dom";
import CardItem from "../cards/сardItem";
import Sorter from "../sorter/sorter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageValue, getSearchValue, getSorterValue } from "../../store/selectors/selector";
import { objectsDataBase, pageParam } from "../../store/actions/actions";
import { onValue } from "firebase/database";
import { dataRef } from "../../server/googleFirebase";
import useCurrencyCoefficient from "../currency/curencyCoefficient";

export const SearchResult = () => {
    const { param } = useParams();    
    const dispatch = useDispatch();
    const target = useSelector(getPageValue);
    const storeSorterValue = useSelector(getSorterValue);
    const searchResponse = useSelector(getSearchValue);
    const regexp = new RegExp(searchResponse.globalSearchInput, 'i');
    const [cardsList, setCardsList] = useState([])
    const currencyCoefficient = useCurrencyCoefficient();

    const cardsListFilter = (
        cardsList.filter((item) => {
            if(!param) {
                return (item.target === target
                    && (item.objectName.match(regexp)
                    || item.description.match(regexp))
                    && item.city.match(searchResponse.inputCity)
                    && item.district.match(searchResponse.inputDistrict)
                    && item.price*currencyCoefficient >= Number(searchResponse.minPrice)
                    && item.price*currencyCoefficient <= Number(searchResponse.maxPrice)
                    && item.m2gross >= Number(searchResponse.minSqure)
                    && item.m2gross <= Number(searchResponse.maxSqure)
                    // && item..match(searchResponse.minSqure)
                    // && item..match(searchResponse.maxSqure)
                    // && item..match(searchResponse.)
                    // && item..match(searchResponse.)
                    // && item.heating.match(searchResponse.heatingNo)
                    // && item.heating.match(searchResponse.heatingGas)
                    // && item.heating.match(searchResponse.heatingElectro)
                    // && item.airConditioning == searchResponse.airYes
                    // || item.airConditioning == searchResponse.airNo)
                    // && item.bathrooms.match(searchResponse.bath0)
                    // && item.bathrooms.match(searchResponse.bath1)
                    // && item.bathrooms.match(searchResponse.bath2)
                    // && item.bathrooms.match(searchResponse.bath3)
                    // && item.bathrooms.match(searchResponse.bath4)
                    // && item.balcony.match(searchResponse.balkony0)
                    // && item.balcony.match(searchResponse.balkony1)
                    // && item.balcony.match(searchResponse.balkony2)
                    // && item.balcony.match(searchResponse.balkony3)
                    // && item.balcony.match(searchResponse.balkony4)
                    // && item.balcony.match(searchResponse.balkony5)
                    // && item.furniture.match(searchResponse.furnitureYes)
                    // && item.furniture.match(searchResponse.furnitureNo)
                    // && item.kitchen.match(searchResponse.kitchenYes)
                    // && item.kitchen.match(searchResponse.kitchenNo)
                )
            }
            return (item.target === target
                && item.realAstateType === param
                && (item.objectName.match(regexp)
                || item.description.match(regexp))
                && item.city.match(searchResponse.inputCity)
                && item.district.match(searchResponse.inputDistrict)
                && item.price*currencyCoefficient >= Number(searchResponse.minPrice)
                && item.price*currencyCoefficient <= Number(searchResponse.maxPrice)
                && item.m2gross >= Number(searchResponse.minSqure)
                && item.m2gross <= Number(searchResponse.maxSqure)
            )         
        })
    );
    
    const pageParametr = {
        flat: 'Квартира',
        house: 'Дом',
        office: 'Офис',
        shop: 'Торговое помещение',
        land: 'Участок',
    };

    /* Sort module */

    switch(storeSorterValue) {
        case "chipiest":
            cardsListFilter.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                    }
                    if (a.price < b.price) {
                    return -1;
                    }
                    return 0;
            });
            break;                
        case "expensive": 
            cardsListFilter.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
            break;   
        case "old":
            cardsListFilter.sort((a, b) => {
                if (a.date > b.date) {
                    return 1;
                    }
                    if (a.date < b.date) {
                    return -1;
                    }
                    return 0;
            });
            break;   
        case "new":  
            cardsListFilter.sort((a, b) => {
                if (a.date > b.date) {
                    return -1;
                    }
                    if (a.date < b.date) {
                    return 1;
                    }
                    return 0;
            });
            break; 
        default:
    };    

    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const newData = Object.entries(data).map((item) => ({
                    id: item[0],
                    ...item[1]
                  }))    
                setCardsList(newData);      
                dispatch(objectsDataBase(newData));  
            }            
        });        
    }, []);

    dispatch(pageParam(String(cardsListFilter.length)));

    if(cardsListFilter.length === 0) {
        return (
            <>
            <main className="main">
                <Sorter pageParametr={pageParametr[param]} />
                <div className="search-result">
                    <p className="empty-search-result">В этом разделе пока ещё нет объектов </p>
                </div>
            </main>            
            </>      
        )
    }
    else {    
        return (
            <>
            <main className="main">
                <Sorter pageParametr={pageParametr[param]}/>
                <div className="search-result">                
                    {cardsListFilter.map((item) => {
                        return(
                            <CardItem key={item.id} id={item.id} objectName={item.objectName} price={item.price} description={item.description} rooms={item.rooms} m2gross={item.m2gross} city={item.city} date={item.date} img={item.img}/>
                        )                    
                    })}
                </div>            
            </main>
            </>
        )
    }   
}

export default SearchResult;