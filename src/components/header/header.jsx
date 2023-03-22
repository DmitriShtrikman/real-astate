import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { currencySelect, languageSelect, pageSelect, searchClearInput } from "../../store/actions/actions";
import { getCurrencyValue, getLanguageValue } from "../../store/selectors/selector";
import $ from "jquery"
import { CurrencyApi } from "../currency/currencyAPI";

export const Header = () => {
    const currency = useSelector(getCurrencyValue);
    const language = useSelector(getLanguageValue);
    const dispatch = useDispatch();
    const activeClassName = "selected";
    const selectedLanguage = document.getElementById(`${language}`);
    const selectedCurrency = document.getElementById(`${currency}`);
    
    const langHandleOpen = () => {
        document.querySelector(".currency-and-language").classList.add('show');
        document.querySelector(".currency-and-menu-wrp").classList.add('show');
    };
    const menuHandleOpen = () => {
        document.querySelector(".menu").classList.add('show');
        document.querySelector(".currency-and-menu-wrp").classList.add('show');
    };
    const handleClose = () => {
        document.querySelector(".currency-and-language").classList.remove('show');
        document.querySelector(".menu").classList.remove('show');
        document.querySelector(".currency-and-menu-wrp").classList.remove('show');
    };
    const handleCurrency = (e) => {
        const id = e.target.id;
        const currencyLi = document.querySelectorAll('.c-li');        
        dispatch(currencySelect(id))
        for(let i=0; i<currencyLi.length; i++) {
            currencyLi[i].classList.remove('selected')
        };  
        e.target.parentNode.classList.add('selected')
    };
    const handleLanguage = (e) => {
        const lenguageLi = document.querySelectorAll(`.l-li`);
        const id = e.target.id;        
        dispatch(languageSelect(id));
        for(let i=0; i<lenguageLi.length; i++) {
            lenguageLi[i].classList.remove('selected')
        };
        e.target.parentNode.classList.add('selected')
    };
    
    const handlePage = (e) => {
        const pageId = e.target.getAttribute('datapage');
        dispatch(pageSelect(pageId));
        dispatch(searchClearInput());
    };



    useEffect(() => {    
        const selectedLanguage = document.getElementById(`${language}`);
        const selectedCurrency = document.getElementById(`${currency}`);

        selectedLanguage.parentNode.classList.add('selected')
        selectedCurrency.parentNode.classList.add('selected')        

        /* jQuery script (show/hide header) */        
        let header = $('.header-fixed'),
        scrollPrev = 0;

        $(window).scroll(function() {
            let scrolled = $(window).scrollTop();
        
            if ( scrolled > 100 && scrolled > scrollPrev ) {
                header.addClass('out');
            } else {
                header.removeClass('out');
            }
            scrollPrev = scrolled;
        }); 
    });

    return (
        <header id="header">
            <CurrencyApi />
            <div id='headerFloat' className="header-block header-fixed container-primary">
                <div className="header-background">                    
                    <Link to="/" className="header-logo">
                        <svg width="170" height="50" xmlns="http://www.w3.org/2000/svg">
                        <g className="layer">
                            <title>Layer 1</title>
                            <text fill="#003da5" fontFamily="Roboto" fontWeight="700" fontSize="35" id="svg_1" stroke="#000000" strokeWidth="0" textAnchor="middle" x="79.225358" xmlSpace="preserve" y="30.821596">ANTALYA</text>
                            <text fill="#dc1c2e" fontFamily="Sans-serif" fontSize="21" id="svg_2" stroke="#000000" strokeWidth="0" textAnchor="middle" x="119.976531" xmlSpace="preserve" y="48.192489">REALTY</text>
                        </g>
                        </svg>
                    </Link>
                    <nav className="header-menu">
                        <NavLink to="/rent" onClick={handlePage} datapage='rent' className="header-menu-item">
                            {({ isActive }) => (
                                <span onClick={handlePage} datapage='rent' className={ isActive ? activeClassName : undefined }>
                                Аренда
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/sale" onClick={handlePage} datapage='sale' className="header-menu-item">
                            {({ isActive }) => (
                                <span onClick={handlePage} datapage='sale' className={ isActive ? activeClassName : undefined }>
                                Продажа
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/new" onClick={handlePage} datapage='new' className="header-menu-item">
                            {({ isActive }) => (
                                <span onClick={handlePage} datapage='new' className={ isActive ? activeClassName : undefined }>
                                Новостройки
                                </span>
                            )}                            
                        </NavLink>
                        <NavLink to="/map" className="header-menu-item">
                            {({ isActive }) => (
                                <span className={ isActive ? activeClassName : undefined }>
                                Карта
                                </span>
                            )}                            
                        </NavLink>
                        <NavLink to="/contacts"  className="header-menu-item">
                        {({ isActive }) => (
                                <span className={ isActive ? activeClassName : undefined }>
                                Контакты
                                </span>
                            )}                            
                        </NavLink>
                        <NavLink to="/landlords"  className="header-menu-item">
                        {({ isActive }) => (
                                <span className={ isActive ? activeClassName : undefined }>
                                Арендодателям
                                </span>
                            )}                            
                        </NavLink>
                    </nav>
                    <div className="header-options">
                        <button id="language" type="button" className="header-options-button" onClick={langHandleOpen}>
                            <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_0_338)">
                                <path d="M23.99 4C12.94 4 4 12.95 4 24C4 35.05 12.94 44 23.99 44C35.04 44 44 35.05 44 24C44 12.95 35.04 4 23.99 4ZM37.84 16H31.94C31.29 13.5 30.38 11.1 29.18 8.88C32.86 10.14 35.92 12.69 37.84 16V16ZM24 8.07C25.67 10.47 26.97 13.14 27.82 16H20.18C21.03 13.14 22.33 10.47 24 8.07ZM8.52 28C8.19 26.72 8 25.38 8 24C8 22.62 8.19 21.28 8.52 20H15.27C15.11 21.31 15 22.64 15 24C15 25.36 15.11 26.69 15.28 28H8.52ZM10.15 32H16.05C16.7 34.5 17.61 36.9 18.81 39.13C15.13 37.87 12.07 35.31 10.15 32V32ZM16.05 16H10.15C12.07 12.69 15.13 10.13 18.81 8.87C17.61 11.1 16.7 13.5 16.05 16ZM24 39.93C22.34 37.53 21.04 34.86 20.18 32H27.82C26.96 34.86 25.66 37.53 24 39.93ZM28.68 28H19.32C19.13 26.69 19 25.36 19 24C19 22.64 19.13 21.31 19.32 20H28.68C28.87 21.31 29 22.64 29 24C29 25.36 28.87 26.69 28.68 28ZM29.19 39.12C30.39 36.89 31.3 34.5 31.95 32H37.85C35.92 35.31 32.86 37.86 29.19 39.12ZM32.72 28C32.88 26.69 33 25.36 33 24C33 22.64 32.89 21.31 32.72 20H39.47C39.8 21.28 40 22.62 40 24C40 25.38 39.81 26.72 39.47 28H32.72Z" />
                            </g>
                                <defs>
                                <clipPath id="clip0_0_338">
                                    <rect width="48" height="48" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1C12.5523 1 13 1.44772 13 2V3.07378C14.5364 3.30481 15.6883 4.04201 16.4742 4.76321C16.6268 4.90322 16.7662 5.04312 16.8928 5.17939C17.2688 5.58394 17.1569 6.21298 16.7055 6.53125C16.2542 6.84952 15.6352 6.73376 15.2397 6.34821C15.2017 6.31115 15.1625 6.27396 15.122 6.23679C14.6092 5.76622 13.9107 5.30865 13 5.10716V6.39227L13 11.0424C14.2472 11.1531 15.3734 11.4887 16.2544 12.1504C17.4165 13.0233 18 14.3467 18 16C18 17.7112 17.2779 19.0469 16.1119 19.9266C15.2329 20.5898 14.1441 20.9645 13 21.099V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21.0672C9.56242 20.8116 8.34014 20.0514 7.47297 19.3604C7.268 19.1971 7.07835 19.034 6.90551 18.8769C6.49681 18.5055 6.52227 17.8694 6.92668 17.4932C7.33109 17.1171 7.96082 17.1443 8.37582 17.5087C8.48378 17.6035 8.59846 17.6999 8.71933 17.7962C9.38016 18.3228 10.1634 18.7957 11 19.0197L11 12.9346C8.04043 12.5404 6 10.418 6 8C6 6.74047 6.48741 5.46609 7.52581 4.51321C8.3779 3.73128 9.54616 3.21445 11 3.05355V2C11 1.44772 11.4477 1 12 1ZM9.94054 5.34207C9.49645 5.51483 9.14693 5.74005 8.87804 5.98679C8.28182 6.53391 8 7.25953 8 8C8 9.1414 9.00188 10.5555 11 10.9142L11 5.70575V5.06942C10.5987 5.12854 10.2471 5.22281 9.94054 5.34207ZM13 19.0808C13.7628 18.9604 14.4163 18.7005 14.9073 18.33C15.5683 17.8314 16 17.0888 16 16C16 14.8533 15.622 14.1767 15.0533 13.7496C14.5894 13.4011 13.9129 13.1543 13 13.0522L13 19.0808Z"/>
                        </svg>
                        </button> 
                        <button id="menu" type="button" className="header-options-button menu-options-button hidden" onClick={menuHandleOpen}>
                        <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_0_2710)">
                            <path d="M6 36H42V32H6V36ZM6 26H42V22H6V26ZM6 12V16H42V12H6Z" />
                            </g>
                            <defs>
                            <clipPath id="clip0_0_2710">
                                <rect width="48" height="48" />
                            </clipPath>
                            </defs>
                        </svg>
                        </button>
                    </div>
                    <div onClick={handleClose}className="currency-and-menu-wrp"></div>
                </div>
                <div className="pop-up-menu-wrp">
                    <div className="currency-and-language">
                        <div className="language-close-btn">
                            <svg onClick={handleClose} className="language-close-btn-point" width="20" height="20" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L7.29289 8L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L8 8.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6464L8.70711 8L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L8 7.29289L5.35355 4.64645Z" />
                            </svg>
                        </div>
                        <div className="currency-and-language-block">
                            <div className="currency-and-language-block-item">
                                <h4 className="grid-head">Валюта</h4>
                                <ul className="currency">
                                <li className="grid-left-top c-li">
                                    <input onClick={handleCurrency} name="currency" type="radio" className="checkbox-visibility" id="$"/>
                                    <label htmlFor="$">USD $</label>
                                </li>
                                <li className="grid-left c-li">
                                    <input onClick={handleCurrency} name="currency" type="radio" className="checkbox-visibility" id="€"/>
                                    <label htmlFor="€">Euro €</label>
                                </li>
                                <li className="grid-right-top c-li">
                                    <input onClick={handleCurrency} name="currency" type="radio" className="checkbox-visibility" id="₺"/>
                                    <label htmlFor="₺">TRL ₺</label>           
                                </li>
                                <li className="grid-right c-li">
                                    <input onClick={handleCurrency} name="currency" type="radio" className="checkbox-visibility" id="₽"/>
                                    <label htmlFor="₽">Rub ₽</label>
                                </li>
                                </ul>
                            </div>
                            <div className="currency-and-language-block-item">
                                <h4 className="grid-head">Выбор языка</h4>
                                <ul className="lenguage">
                                <li className="grid-left-top l-li">
                                    <input onClick={handleLanguage} name="language" type="radio" className="checkbox-visibility" id="rus"/>
                                    <label htmlFor="rus">Русский</label> 
                                </li>
                                <li className="grid-left l-li">
                                    <input onClick={handleLanguage} name="language" type="radio" className="checkbox-visibility" id="en"/>
                                    <label htmlFor="en">English</label> 
                                </li>
                                <li className="grid-right l-li">
                                    <input onClick={handleLanguage} name="language" type="radio" className="checkbox-visibility" id="tr"/>
                                    <label htmlFor="tr">Türkçe</label> 
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="menu">
                        <div className="menu-close-btn">
                            <svg onClick={handleClose} className="menu-close-btn-point" width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L7.29289 8L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L8 8.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6464L8.70711 8L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L8 7.29289L5.35355 4.64645Z" />
                            </svg>
                        </div>
                        <div className="currency-and-language-block">
                            <div className="menu-block-item">
                                <h4>Меню</h4>
                                <nav className="menu-head">
                                    <NavLink to="/" className="menu-head-item">
                                        {({ isActive }) => (
                                            <span className={ isActive ? activeClassName : undefined }>
                                            Главная
                                            </span>
                                        )}
                                    </NavLink>
                                    <NavLink to="/rent" onClick={handlePage} datapage='rent' className="menu-head-item">
                                        {({ isActive }) => (
                                            <span onClick={handlePage} datapage='rent' className={ isActive ? activeClassName : undefined }>
                                            Аренда
                                            </span>
                                        )}
                                    </NavLink>
                                    <NavLink to="/sale" onClick={handlePage} datapage='sale' className="menu-head-item">
                                        {({ isActive }) => (
                                            <span onClick={handlePage} datapage='sale' className={ isActive ? activeClassName : undefined }>
                                            Продажа
                                            </span>
                                        )}
                                    </NavLink>
                                    <NavLink to="/new" onClick={handlePage} datapage='new' className="menu-head-item">
                                        {({ isActive }) => (
                                            <span to="/new" onClick={handlePage} datapage='new' className={ isActive ? activeClassName : undefined }>
                                            Новостройки
                                            </span>
                                        )}                            
                                    </NavLink>
                                    <NavLink to="/map" className="menu-head-item">
                                        {({ isActive }) => (
                                            <span className={ isActive ? activeClassName : undefined }>
                                            Карта
                                            </span>
                                        )}                            
                                    </NavLink>
                                    <NavLink to="/contacts"  className="menu-head-item">
                                        {({ isActive }) => (
                                            <span className={ isActive ? activeClassName : undefined }>
                                            Контакты
                                            </span>
                                        )}                            
                                    </NavLink>
                                    <NavLink to="/landlords"  className="menu-head-item">
                                        {({ isActive }) => (
                                            <span className={ isActive ? activeClassName : undefined }>
                                            Арендодателям
                                            </span>
                                        )}                            
                                    </NavLink>
                                </nav>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </header>
    )
}

export default Header;