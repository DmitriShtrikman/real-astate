import { onValue } from "firebase/database";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dataRef } from "../../server/googleFirebase";
import { getCurrencyValue } from "../../store/selectors/selector";
import { getPageValue } from "../../store/selectors/selector";
import useCurrencyCoefficient from "../currency/curencyCoefficient";

export const CardComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fullDataBase, setFullDataBase] = useState([]);
    
    const pageKey = useSelector(getPageValue);
    const currency = useSelector(getCurrencyValue);
    const valuteCoefficient = useCurrencyCoefficient();
    const noAction = (e) => {
        e.preventDefault();
    };
    const [mainPhotoKey, setMainPhotoKey] = useState('0');

    const handleChangePhoto = (e, imgNumber) => {
        setMainPhotoKey(imgNumber)
    };
    
    const page = {
        rent: 'Аренда',
        sale: 'Продажа',
        new: 'Новостройки',
    };
    const pageType = {
        flat:'Квартира',
        house:'Дом',
        office:'Офис',
        shop:'Торговое помещение',
        land:'Участок',
    }        

    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newData = Object.entries(data).map((item) => ({
                    id: item[0],
                    ...item[1]
                  }))    
                setFullDataBase(newData);
            }
          });
    }, []);

    // useEffect (() => {
    //     document.querySelector('.card-photo-small-screen-active').classList.add('active');
    // })

    return (
        <>
        {fullDataBase.filter(item => item.id == id).map((item) => 
            <div key={item + Math.random() * 10000}>
            <div className="card-title-wrp">
                <nav className="filter-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={'/'}>
                                <svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4785 2.99047C11.7987 2.79484 12.2013 2.79484 12.5215 2.99047L19.5215 7.26825C19.8187 7.4499 20 7.77316 20 8.12153V18.9999C20 19.5521 19.5523 19.9999 19 19.9999H16V13.9999C16 12.343 14.6569 10.9999 13 10.9999H11C9.34315 10.9999 8 12.343 8 13.9999V19.9999H5C4.44772 19.9999 4 19.5521 4 18.9999V8.12153C4 7.77316 4.1813 7.4499 4.47855 7.26825L11.4785 2.99047ZM10 19.9999V13.9999C10 13.4476 10.4477 12.9999 11 12.9999H13C13.5523 12.9999 14 13.4476 14 13.9999V19.9999H10ZM15 21.9999H19C20.6569 21.9999 22 20.6567 22 18.9999V8.12153C22 7.07643 21.4561 6.10665 20.5644 5.56168L13.5644 1.2839C12.604 0.697032 11.396 0.697032 10.4356 1.2839L3.43565 5.56168C2.54389 6.10665 2 7.07643 2 8.12153V18.9999C2 20.6567 3.34315 21.9999 5 21.9999H9H15Z" />
                                </svg>
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/${pageKey}`}>{page[pageKey]}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to={`/${pageKey}/${item.realAstateType}`}>{pageType[item.realAstateType]}</Link>
                            </li>
                    </ol>
                </nav>
                <h2 className="card-name">{item.objectName}</h2>
                <p className="card-id">№ объекта: {item.id}</p>            
            </div>
            <div className="card-main-info">
                <div className="card-photo">
                    <div className="card-photo-main">
                        <img className="card-photo-main-img" src={item.img[mainPhotoKey]} alt={item.img[mainPhotoKey]} />
                    </div>
                    <div className="card-photo-carousel">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="card-photo-carousel-item">
                                        {item.img.slice(0, 4).map((item, index) => {                            
                                            return(
                                            <img key={item + Math.random() * 10000} className="card-photo-main-item-img" src={item} alt={item} onClick={(e) => handleChangePhoto(e, index)} />                            
                                            )                                               
                                        })}
                                    </div>               
                                </div>                            
                                {item.img.length <= 4 ? null :
                                    <div className="carousel-item">
                                        <div className="card-photo-carousel-item ">
                                            {item.img.slice(4, 8).map((item, index) => {                            
                                                return(
                                                <img key={item + Math.random() * 10000} className="card-photo-main-item-img" src={item} alt={item} onClick={(e) => handleChangePhoto(e, index + 4)} />                            
                                                )                                               
                                            })}
                                        </div>
                                    </div>
                                }
                                {item.img.length <= 8 ? null :
                                    <div className="carousel-item">
                                        <div className="card-photo-carousel-item ">
                                            {item.img.slice(8, 12).map((item, index) => {                            
                                                return(
                                                <img key={item + Math.random() * 10000} className="card-photo-main-item-img" src={item} alt={item} onClick={(e) => handleChangePhoto(e, index + 8)} />                            
                                                )                                               
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                            <button className="carousel-control-prev carousel-control-custom" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">                            
                                    <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3536 1.64645C11.5488 1.84171 11.5488 2.15829 11.3536 2.35355L5.70711 8L11.3536 13.6464C11.5488 13.8417 11.5488 14.1583 11.3536 14.3536C11.1583 14.5488 10.8417 14.5488 10.6464 14.3536L4.64645 8.35355C4.45118 8.15829 4.45118 7.84171 4.64645 7.64645L10.6464 1.64645C10.8417 1.45118 11.1583 1.45118 11.3536 1.64645Z" />
                                    </svg>                            
                            </button>
                            <button className="carousel-control-next carousel-control-custom" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">                            
                                    <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z" />
                                    </svg>                            
                            </button>                      
                        </div>               
                    </div>
                    <div className="card-item-description-p">{item.description}</div>
                </div>
                <div className="card-photo-small-screen">
                    <div id="carouselExampleFade" className="carousel slide carousel-fade">
                        <div className="carousel-inner carousel-inner-small">
                            <div className="carousel-item card-photo-main active">
                                <img src={item.img[0]} className="d-block w-100 card-item-img" alt={item.img[0]} />
                            </div>   
                            {item.img.slice(1).map((item) => {                            
                                return(  
                                <div key={item + Math.random() * 10000} className="carousel-item card-photo-main">
                                    <img src={item} className="d-block w-100 card-item-img" alt={item} />
                                </div>                            
                                )                                               
                            })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <p className="card-region">Всего {item.img.length} фото</p>
                    <div className="card-item-description-p">{item.description}</div>
                </div>
                <div className="card-characters">                
                    <h3 className="card-price">{Math.round(item.price * valuteCoefficient).toLocaleString()}<span>{currency}</span></h3>
                    <div className="card-region-wrp">
                        <p className="card-region">{item.city} / {item.district}</p>
                        <p className="card-region">{item.date}</p>
                    </div>                
                    <div className="card-properties-wrp">
                        <ul className="card-properties-ul">
                            <li>
                                <p className="card-properties-item">Вид недвижимости</p>
                                <p className="card-properties-item-value">{pageType[item.realAstateType]}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Общая площадь, m²</p>
                                <p className="card-properties-item-value">{item.m2gross}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Жилая площадь, m²</p>
                                <p className="card-properties-item-value">{item.m2net}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Количество комнат</p>
                                <p className="card-properties-item-value">{item.rooms}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Этаж</p>
                                <p className="card-properties-item-value">{item.floor}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Всего этажей</p>
                                <p className="card-properties-item-value">{item.totalFloor}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Отопление</p>
                                <p className="card-properties-item-value">{item.heating}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Кондиционер</p>
                                <p className="card-properties-item-value">
                                    {item.airConditioning ? 'Есть' : 'Нет'}
                                </p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Ванные комнаты</p>
                                <p className="card-properties-item-value">{item.bathrooms}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Балкон</p>
                                <p className="card-properties-item-value">{item.balcony}</p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Мебель</p>
                                <p className="card-properties-item-value">
                                    {item.furniture ? 'Есть' : 'Нет'}
                                </p>
                            </li>
                            <div className="card-divide"></div>
                            <li>
                                <p className="card-properties-item">Кухонная мебель</p>
                                <p className="card-properties-item-value">
                                    {item.kitchen ? 'Есть' : 'Нет'}
                                </p>
                            </li>                            
                            <div className="card-divide margin-bottom"></div>
                            <li>
                                <p className="card-properties-mini-item">Кухонная плита</p>
                                <p className="card-properties-mini-item-value">
                                <input className="form-check-input" type="checkbox" value='' id="stove" onClick={noAction} defaultChecked={item.stove} />
                                </p>
                            </li>
                            <li>
                                <p className="card-properties-mini-item">Посудомоечная машина</p>
                                <p className="card-properties-mini-item-value">
                                <input className="form-check-input" type="checkbox" value='' id="dishwasher" onClick={noAction} defaultChecked={item.dishwasher} />
                                </p>
                            </li>
                            <li>
                                <p className="card-properties-mini-item">Стиральная машина</p>
                                <p className="card-properties-mini-item-value">
                                <input className="form-check-input" type="checkbox" value='' id="washingMachine" onClick={noAction} defaultChecked={item.washingMachine} />
                                </p>
                            </li>
                            <li>
                                <p className="card-properties-mini-item">Холодильник</p>
                                <p className="card-properties-mini-item-value">
                                <input className="form-check-input" type="checkbox" value='' id="refrigerator" onClick={noAction} defaultChecked={item.refrigerator} />
                                </p>
                            </li>
                            <li>
                                <p className="card-properties-mini-item">Микроволновая печь</p>
                                <p className="card-properties-mini-item-value">
                                <input className="form-check-input" type="checkbox" value='' id="microwave" onClick={noAction} defaultChecked={item.microwave} />
                                </p>
                            </li>   
                        </ul>                        
                        <button onClick={() => navigate(-1)} className="btn btn-primary landlord-button">Вернуться назад</button>                     
                    </div>
                </div>
            </div>
            </div>
        )}
        </>
    )
}

export default memo(CardComponent);