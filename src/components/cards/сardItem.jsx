import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { chosenObject } from "../../store/actions/actions";
import { getCurrencyValue, getFullDataBase } from "../../store/selectors/selector";
import useCurrencyCoefficient from "../currency/curencyCoefficient";


export const CardItem = (props) => {
    const currency = useSelector(getCurrencyValue);
    const valuteCoefficient = useCurrencyCoefficient();
    const dispatch = useDispatch();
    
    const fullDataBase = useSelector(getFullDataBase);

    const letters = "abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    const idCarousel = letters[randomIndex];

    const getThisObject = fullDataBase.filter((item) => {
        return item.number === props.number
    });
    const dispatchChoosenObject = () => {
        dispatch(chosenObject(getThisObject)); 
    };

    useEffect(() => {
        const carouselInner = document.querySelectorAll('.carousel-inner')
        for (let item of carouselInner) {
            item.children[0].classList.add('active')
        }        
    });

    return (
        <>
        <Link to={`/card/${props.number}`} onClick={dispatchChoosenObject} className="card-item-wrp">
            <div className="card-item">                
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
                    <p className="card-item-price">Price <span>{Math.round(props.price * valuteCoefficient).toLocaleString()}</span> {currency} </p>
                    <p className="card-item-description">
                    {props.description}
                    </p>
                    <div className="card-item-propertties">
                        <p>{props.rooms}</p>
                        <p>{props.m2gross}<span>m²</span></p>
                        <p>{props.city}</p>
                        <p>{props.date}</p>
                    </div>                    
                </div>                
            </div>
        </Link>
        </>
    );
}

export default CardItem;