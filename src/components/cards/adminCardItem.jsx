import { getDatabase, push, ref, remove } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { dataRef } from "../../server/googleFirebase";
import { chosenObject } from "../../store/actions/actions";
import { getCurrencyValue, getFullDataBase } from "../../store/selectors/selector";
import useCurrencyCoefficient from "../currency/curencyCoefficient";


export const AdminCardItem = (props) => {
    const currency = useSelector(getCurrencyValue);
    const valuteCoefficient = useCurrencyCoefficient();
    const navigate = useNavigate();
    const db = getDatabase();
    
    
    const fullDataBase = useSelector(getFullDataBase);

    const letters = "abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    const idCarousel = letters[randomIndex];

    const removeObject = (e) => {
        e.preventDefault();
        remove(ref(db, props.db + '/' + e.target.value))
    };

    const editObject = (e) => {
        e.preventDefault();
        navigate('card/' + e.target.value);
    };

    const letPublicObject = (e) => {
        e.preventDefault();
        // Create new number
        let newIdArray = [];
        for(let i=0; i<fullDataBase.length; i++) {
            newIdArray.push(fullDataBase[i].number)
        }
        const number = String(Math.max(...newIdArray) + 3);
        
        let item = props.item;
        delete item.id;
        item.number = number;
        push(dataRef, item); 
        remove(ref(db, 'fulldb/' + e.target.value))    
    };

    const letPublicButton = () => {
        if(props.db === "fulldb") {
            return (         
            <button onClick={letPublicObject} type="button" className="btn btn-primary admin-edit-btn" form="landlordForm" value={props.id}>Опубликовать</button>
            )
        }
    };
    

    useEffect(() => {
        const carouselInner = document.querySelectorAll('.carousel-inner')
        for (let item of carouselInner) {
            item.children[0].classList.add('active')
        }        
    });

    return (
        <>
            <div className="card-item admin-card-item">  
                <div className="admin-card-item-main">
                    <div className="card-item-img-wrp">
                        <div id={idCarousel} className="carousel slide">
                            <div className="carousel-inner">
                                {props.img.map((item) => {                            
                                    return(
                                    <div key={item} className="carousel-item card-item-img-wrp">
                                        <img src={item} className="d-block w-100 card-item-img" alt={item}/>
                                    </div>                            
                                    )                                               
                                })}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={"#" + idCarousel} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={"#" + idCarousel} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="card-item-properties">
                        <h4 className="card-item-name">{props.objectName}</h4>
                        <p className="admin-card-item-price">Price <span>{Math.round(props.price * valuteCoefficient).toLocaleString()}</span> {currency} </p>
                        <p className="card-item-description">
                        {props.description}
                        </p>
                        <div className="admin-card-item-propertties">
                            <p>№ объекта: <span>{props.number}</span></p>  
                            <p>Город: <span>{props.city}</span></p>
                            <p>Район: <span>{props.district}</span></p>
                            <p>Дата создания: <span>{props.date}</span></p>
                            <p>Недвижимость: <span>{props.realAstateType}</span></p>
                            <p>Предложение: <span>{props.target}</span></p>
                        </div>                    
                    </div>   
                </div>              
                <div className="admin-card-item-settings">
                    <button onClick={removeObject} type="button" className="btn btn-danger admin-remove-btn" form="landlordForm" value={props.id}>Удалить</button>
                    <button onClick={editObject} type="button" className="btn btn-primary admin-edit-btn" form="landlordForm" value={props.number}>Редактировать</button>
                    {letPublicButton()}
                </div>
            </div>
        </>
    );
}

export default AdminCardItem;