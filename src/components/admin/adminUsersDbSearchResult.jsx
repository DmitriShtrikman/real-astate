import { useParams } from "react-router-dom";
import CardItem from "../cards/сardItem";
import Sorter from "../sorter/sorter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageValue, getSearchValue, getSorterValue } from "../../store/selectors/selector";
import { usersDataBase, pageParam, sorterValue } from "../../store/actions/actions";
import { onValue } from "firebase/database";
import { dataRef, dataUsersRef } from "../../server/googleFirebase";
import useCurrencyCoefficient from "../currency/curencyCoefficient";
import AdminCardItem from "../cards/adminCardItem";

export const AdminUsersSearchResult = () => {
    const { param } = useParams();    
    const dispatch = useDispatch();
    const target = useSelector(getPageValue);
    const storeSorterValue = useSelector(getSorterValue);
    const searchResponse = useSelector(getSearchValue);
    const regexp = new RegExp(searchResponse.globalSearchInput, 'i');
    const [cardsList, setCardsList] = useState([])
    const currencyCoefficient = useCurrencyCoefficient();
    const [sortValue, setSortValue] = useState("sort");
    const totalValue = cardsList.length;

    const handleChangeValue = (e) => {
        setSortValue(e.target.value);
        dispatch(sorterValue(e.target.value));
    };

    const cardsListFilter = (
        cardsList.filter((item) => {            
            return (
                (item.objectName.match(regexp)
                || item.description.match(regexp) || item.number.match(regexp) )
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
                     
        })
    );    

    /* Sort module */

    switch(storeSorterValue) {
        case "chipiest":
            cardsListFilter.sort((a, b) => {
                if (Number(a.price) > Number(b.price)) {
                    console.log(b.price)
                    return 1;
                    }
                if (Number(a.price) < Number(b.price)) {
                    console.log(a.price)
                return -1;
                }
                return 0;
            });
            break;                
        case "expensive": 
            cardsListFilter.sort((a, b) => {
                if (Number(a.price) > Number(b.price)) {
                    return -1;
                }
                if (Number(a.price) < Number(b.price)) {
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
        onValue(dataUsersRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const newData = Object.entries(data).map((item) => ({
                    id: item[0],
                    ...item[1]
                  }))    
                setCardsList(newData);      
                dispatch(usersDataBase(newData));  
            }            
        });        
    }, []);

    dispatch(pageParam(String(cardsListFilter.length)));

    if(cardsListFilter.length === 0) {
        return (
            <>
            <main className="admin-main">
                <p className="filter-result-notification">Всего <span>{totalValue}</span> объектов</p>
                <select value={sortValue} onChange={handleChangeValue} className="form-select admin-sorter" aria-label="Default select example">
                    <option disabled value="sort">Сортировать...</option>
                    <option value="expensive">По цене (Сначала дороже)</option>
                    <option value="chipiest">По цене (Сначала дешевле)</option>
                    <option value="new">По дате (Сначала новые)</option>
                    <option value="old">По дате (Сначала старые)</option>
                </select> 
                <div className="search-result">
                    <p className="empty-search-result">В этом разделе нет объектов </p>
                </div>
            </main>            
            </>      
        )
    }
    else {    
        return (
            <>
            <main className="admin-main">
                <p className="filter-result-notification">Всего <span>{totalValue}</span> объектов</p>
                <select value={sortValue} onChange={handleChangeValue} className="form-select admin-sorter" aria-label="Default select example">
                    <option disabled value="sort">Сортировать...</option>
                    <option value="expensive">По цене (Сначала дороже)</option>
                    <option value="chipiest">По цене (Сначала дешевле)</option>
                    <option value="new">По дате (Сначала новые)</option>
                    <option value="old">По дате (Сначала старые)</option>
                </select> 
                <div className="search-result">                
                    {cardsListFilter.map((item) => {
                        return(
                            <AdminCardItem db='fulldb' item={item} key={item.number} id={item.id} number={item.number} objectName={item.objectName} price={item.price} description={item.description} rooms={item.rooms} m2gross={item.m2gross} city={item.city} date={item.date} img={item.img} district={item.district} realAstateType={item.realAstateType} target={item.target}/> 
                        )                    
                    })}
                </div>            
            </main>
            </>
        )
    }   
}

export default AdminUsersSearchResult;