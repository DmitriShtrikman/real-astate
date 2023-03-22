import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { currencySelect, pageSelect, searchCheckBox, searchClearInput, searchTyping } from "../../store/actions/actions";
import { getCurrencyValue, getMainSearchValue, getPageValue, getRegionsDataBase, getSearchValue } from "../../store/selectors/selector";

export const SearchAside = () => {
    const currency = useSelector(getCurrencyValue);
    const pageKey = useSelector(getPageValue);
    const dispatch = useDispatch();
    const [currencySymbol, setCurrencySymbol] = useState(currency)  
    const searchValues = useSelector(getSearchValue);
    const regions = useSelector(getRegionsDataBase);

    const getCountryList = () => {
        try {
            let regionstArr = []
            for (let i in regions) {
                regionstArr.push(<option key={regions[i].id} value={regions[i].id}>{regions[i].id}</option>)
            }
            return regionstArr
        } catch (error) {
        console.error(error);
        }
    }

    const getDistrict = () => {
        try {
        const district = regions.find(element=>element.id === searchValues.
            inputCity)
        let districtArr = []
        for (let i in district) {
            if (i!='id') {
                districtArr.push(<option key={district[i]} value={district[i]}>{district[i]}</option>)
            }
        }
        return districtArr
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleCurrency = (e) => {
        const id = e.target.getAttribute('dataname');
        dispatch(currencySelect(id))
        const currencyLi = document.querySelectorAll('.c-li');
        for(let i=0; i<currencyLi.length; i++) {
            currencyLi[i].classList.remove('selected')
        };
        e.target.parentNode.classList.add('selected')   
    };
    const handleSearchCloseButton = () => {
        document.querySelector('.aside-search').style.display = 'none';
    };
    const handlePage = (e) => {
        const pageId = e.target.getAttribute('datapage');
        dispatch(pageSelect(pageId));
        dispatch(searchClearInput());
    };

    const handleInputs = (event) => {
        dispatch(searchTyping(event))
    };
    const handleCheckBox = (event) => {
        dispatch(searchCheckBox(event));
    };    

    const clearInputs = (e) => {
        e.preventDefault();
        /* Clearing inputs */
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        for (let i = 0;  i < inputs.length; i++) {
        inputs[i].value = '';
        inputs[i].checked = false;
        };
        for (let i = 0;  i < selects.length; i++) {
            selects[i].value = 'main';
            };
        dispatch(searchClearInput())
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('.aside-search').style.display = 'none';
    };

    useEffect(() => {
        const currencyAsideLi = document.querySelectorAll('.btn-check');
        const contextMenu = document.querySelectorAll('.header-menu-item-context');        

        for(let i=0; i<contextMenu.length; i++) {
            contextMenu[i].classList.add('hidden');
        };        
        for(let i=0; i<currencyAsideLi.length; i++) {            
            if(currencyAsideLi[i].getAttribute('dataname') === `${currency}`) {
                currencyAsideLi[i].checked = true;
            };
        }
        setCurrencySymbol(currency);      

        switch(pageKey) {
            case 'rent': 
                document.querySelector('.rent').classList.remove('hidden');
                break;
            case 'sale': 
                document.querySelector('.sale').classList.remove('hidden');
                break;
            case 'new': document.querySelector('.new').classList.remove('hidden');
                break;
            default: break;
        };
    });

    return (
        <>
        <aside className="aside-search">
            <h3 className="aside-search-head">Недвижимость</h3>
            <div className="language-close-btn searchbar-close-button">
                            <svg onClick={handleSearchCloseButton} className="language-close-btn-point" width="20" height="20" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L7.29289 8L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L8 8.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6464L8.70711 8L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L8 7.29289L5.35355 4.64645Z" />
                            </svg>
                        </div>
            <form id="search-form" onSubmit={handleSubmit}>
                <div className="form-check-wrp">
                    <NavLink onClick={handlePage} datapage='rent' to="/rent" className="header-menu-item-search">
                        Аренда
                    </NavLink>
                    <ul className="header-menu-item-context rent">
                        <li>
                            <Link className="header-menu-item-context-link" to='/rent/flat'  datapage='flat'>Квартира</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/rent/house'  datapage='house'>Дом</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/rent/office'  datapage='office'>Офис</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/rent/shop'  datapage='shop'>Торговое помещение</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/rent/land'  datapage='land'>Участок</Link>
                        </li>                        
                    </ul>
                    <NavLink onClick={handlePage} datapage='sale' to="/sale" className="header-menu-item-search">
                        Продажа
                    </NavLink>
                    <ul className="header-menu-item-context sale">
                        <li>
                            <Link className="header-menu-item-context-link" to='/sale/flat'  datapage='flat'>Квартира</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/sale/house'  datapage='house'>Дом</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/sale/office'  datapage='office'>Офис</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/sale/shop'  datapage='shop'>Торговое помещение</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/sale/land'  datapage='land'>Участок</Link>
                        </li> 
                    </ul>
                    <NavLink onClick={handlePage} datapage='new' to="/new" className="header-menu-item-search">
                        Новостройки
                    </NavLink>
                    <ul className="header-menu-item-context new">
                        <li>
                            <Link className="header-menu-item-context-link" to='/new/flat'  datapage='flat'>Квартира</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/new/house'  datapage='house'>Дом</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/new/office'  datapage='office'>Офис</Link>
                        </li>
                        <li>
                            <Link className="header-menu-item-context-link" to='/new/shop'  datapage='shop'>Торговое помещение</Link>
                        </li>
                    </ul>
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button accordion-button-user" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Поиск
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" data-bs-parent="#accordionExample" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <div className="mb-3">
                                    <input type="text" 
                                    onChange={handleInputs} 
                                    className="form-control" 
                                    id="globalSearchInput"
                                    placeholder="Название или описание"/>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwelve">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwelve" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwelve">
                            Расположение
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwelve" data-bs-parent="#accordionExample"  className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwelve">
                         <div className="accordion-body">
                                <select className="form-select form-select-dev" onChange={handleInputs} defaultValue='main' id="inputCity" required>
                                    <option disabled value="main">Город</option>
                                    {getCountryList()}
                                </select>
                                <div className="invalid-feedback">
                                Please select a valid option.
                                </div>
                                <select className="form-select" onChange={handleInputs} defaultValue='main' id="inputDistrict" required>
                                    <option disabled value="main">Район</option>
                                {getDistrict()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Цена
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body">
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" onClick={handleCurrency} className="btn-check" dataname="$" name="btnradio" id="btnradio1" autoComplete="off" />
                                    <label className="btn btn-user btn-outline-primary" htmlFor="btnradio1">USD $</label>

                                    <input type="radio" onClick={handleCurrency} className="btn-check" dataname="€" name="btnradio" id="btnradio2" autoComplete="off"/>
                                    <label className="btn btn-user btn-outline-primary" htmlFor="btnradio2">Euro €</label>

                                    <input type="radio" onClick={handleCurrency} className="btn-check" dataname="₺" name="btnradio" id="btnradio3" autoComplete="off"/>
                                    <label className="btn btn-user btn-outline-primary" htmlFor="btnradio3">TRL ₺</label>

                                    <input type="radio" onClick={handleCurrency} className="btn-check" dataname="₽" name="btnradio" id="btnradio4" autoComplete="off"/>
                                    <label className="btn btn-user btn-outline-primary" htmlFor="btnradio4">Rub ₽</label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input id="minPrice" 
                                        onChange={handleInputs} 
                                        type="number" 
                                        min="0" 
                                        max="50000000" 
                                        className="form-control" 
                                        placeholder="Мин" 
                                        aria-label="Min"/>
                                        <span>{currencySymbol}</span>
                                    </div>
                                    <div className="col">
                                        <input id="maxPrice"  
                                        onChange={handleInputs} 
                                        type="number" 
                                        min="0" 
                                        max="50000000" 
                                        className="form-control" 
                                        placeholder="Макс" 
                                        aria-label="Max"/>
                                        <span>{currencySymbol}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Общая площадь
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col">
                                        <input id="minSqure" 
                                        onChange={handleInputs} 
                                        type="number" 
                                        min="0" 
                                        max="100000" 
                                        className="form-control" 
                                        placeholder="Мин" 
                                        aria-label="Min"/>
                                        <span>m²</span>
                                    </div>
                                    <div className="col">
                                        <input id="maxSqure"  
                                        onChange={handleInputs} 
                                        type="number" 
                                        min="0" 
                                        max="100000" 
                                        className="form-control" 
                                        placeholder="Макс" 
                                        aria-label="Max"/>
                                        <span>m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                        Количество комнат
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="1+1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="1+1">1+1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="2+1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="2+1">2+1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="3+1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="3+1">3+1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="4+1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="4+1">4+1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="5+1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="5+1">5+1</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                        Отопление
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFive" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="heatingNo" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        value="Not" 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="heatingNo">Нет</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="heatingGas" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        value="Gas"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="heatingGas">Газ</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="heatingElectro" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        value="Electro"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="heatingElectro">Электричество</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                        Кондционер
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSix" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="airYes" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        // value={true}
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="airYes">Есть</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="airNo" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        // value={false}
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="airNo">Нет</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
                        Ванных комнат
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSeven" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="bath0" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="bath0">Нет</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="bath1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="bath1">1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="bath2" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="bath2">2</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="bath3" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="bath3">3</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="bath4" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="bath4">4</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingEight">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false" aria-controls="panelsStayOpen-collapseEight">
                        Балкон
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseEight" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingEight">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony0" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony0">Нет</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony1" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony1">1</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony2" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony2">2</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony3" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony3">3</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony4" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony4">4</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="balkony5" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="balkony5">5</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingNine">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseNine" aria-expanded="false" aria-controls="panelsStayOpen-collapseNine">
                        Мебель
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseNine" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingNine">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="furnitureYes" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="furnitureYes">Есть</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="furnitureNo" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="furnitureNo">Нет</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTen">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTen" aria-expanded="false" aria-controls="panelsStayOpen-collapseTen">
                        Кухонная мебель
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTen" data-bs-parent="#accordionExample" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTen">
                            <div className="accordion-body">
                                <div className="row accordion-checkbox-input">
                                    <div className="col form-check checkbox-input">
                                        <input id="kitchenYes" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="kitchenYes">Есть</label>
                                    </div>
                                    <div className="col form-check checkbox-input">
                                        <input id="kitchenNo" 
                                        defaultChecked={false}
                                        onChange={handleCheckBox} 
                                        type="checkbox"
                                        className="form-check-input"/>
                                        <label className="form-label" htmlFor="kitchenNo">Нет</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                     */}
                    <div className="search-button">
                    <button type="submit" form="search-form" className="btn btn-primary search-button-item">Поиск</button>
                    <button type="button" onClick={clearInputs} form="search-form" className="btn btn-primary clear-button-item">Очистить поиск</button>
                    </div>   
                </div>
            </form>    
        </aside>
            
        </>
    )
}

export default SearchAside;