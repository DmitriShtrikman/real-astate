import { onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dataRef } from "../../server/googleFirebase";
import { chosenObject, objectsDataBase } from "../../store/actions/actions";
import { getCurrencyValue } from "../../store/selectors/selector";

export const Cards = (props) => {
    const currency = useSelector(getCurrencyValue);
    const dispatch = useDispatch();
    const [cardsList, setCardsList] = useState([]);

    const cardsListFilter = (
        cardsList.filter((item) => {
                return (item.target === props.name)
    }));

    cardsListFilter.sort((a, b) => {
        if (a.price > b.price) {
            return 1;
            }
            if (a.price < b.price) {
            return -1;
            }
            return 0;
    });

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
                console.log(newData)           
            }
        });        
    }, []);

    return (
        <>
            <div className="offers-carousel-item">
                <p className="offers-carousel-item-name">{props.name}</p>
                <div className="offers-carousel-card-block">
                    {cardsListFilter.slice(0, 4).map((item) => {
                        return (
                            <Link key={Math.random() * 10000} to={`/card/${item.id}`} className="card-item-wrp">
                                <div className="offer-card">
                                    <img className="offer-card-img" src={item.img[0]} alt="..." />
                                    <div className="offer-card-properties">
                                        <h4 className="offer-card-name">{item.objectName}</h4>
                                        <p className="offer-card-description">{item.description}</p>
                                        <p className="offer-card-price">Price <span>{item.price}</span> {currency} </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Cards;