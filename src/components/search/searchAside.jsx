import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { currencySelect, pageSelect } from "../../store/actions/actions";
import { getCurrencyValue, getPageValue } from "../../store/selectors/selector";

export const SearchAside = () => {
    const currency = useSelector(getCurrencyValue);
    const pageKey = useSelector(getPageValue);
    const dispatch = useDispatch();
    const [currencySymbol, setCurrencySymbol] = useState(currency)  
    
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
            <form id="search-form">
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
                            Адрес
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" data-bs-parent="#accordionExample" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <select className="form-select form-select-dev" defaultValue='city' id="inputCountry" required>
                                    <option disabled value="city">Город</option>
                                    <option value="Istanbul">Стамбул</option>
                                    <option value="Antalya">Анталья</option>
                                    <option value="Alanya">Аланья</option>
                                    <option value="Mersin">Мерсин</option>
                                </select>
                                <div className="invalid-feedback">
                                Please select a valid option.
                                </div>
                                <select className="form-select" defaultValue='district' id="inputCity" required>
                                    <option disabled value="district">Район</option>
                                    <option value="Kepez">Кепез</option>
                                    <option value="Konyalty">Конъялты</option>
                                    <option value="Lara">Лара</option>
                                    <option value="Muratpasha">Муратпаша</option>
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
                                        <input type="number" min="0" max="99999999" className="form-control" placeholder="Мин" aria-label="Min"/>
                                        <span>{currencySymbol}</span>
                                    </div>
                                    <div className="col">
                                        <input type="number" min="0" max="99999999" className="form-control" placeholder="Макс" aria-label="Max"/>
                                        <span>{currencySymbol}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Поиск
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" data-bs-parent="#accordionExample"  className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="По всем параметрам"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-button">
                    <button type="submit" form="search-form" className="btn btn-primary search-button-item">Искать</button>
                    </div>   
                </div>
            </form>    
        </aside>
            
        </>
    )
}

export default SearchAside;