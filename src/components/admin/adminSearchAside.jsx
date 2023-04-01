import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelect, searchClearInput, searchTyping } from "../../store/actions/actions";
import { getCurrencyValue, getRegionsDataBase, getSearchValue } from "../../store/selectors/selector";


export const AdminSearchAside = () => {
    const currency = useSelector(getCurrencyValue);
    const dispatch = useDispatch();
    const [currencySymbol, setCurrencySymbol] = useState(currency)  
    const searchValues = useSelector(getSearchValue);
    const regions = useSelector(getRegionsDataBase);

    const getCountryList = () => {
        try {
            let regionstArr = []
            for (let i in regions) {
                regionstArr.push(<option key={regions[i].id} value={regions[i].id}>{regions[i].city}</option>)
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
            if (i!='city' && i!='id') {
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

    const handleInputs = (event) => {
        dispatch(searchTyping(event))
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
    });



    return (
        <>
        <aside className="aside-search">
            <h3 className="aside-search-head">Вся недвижимость</h3>
            <div className="language-close-btn searchbar-close-button">
                            <svg onClick={handleSearchCloseButton} className="language-close-btn-point" width="20" height="20" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L7.29289 8L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L8 8.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6464L8.70711 8L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L8 7.29289L5.35355 4.64645Z" />
                            </svg>
                        </div>
            <form id="search-form" onSubmit={handleSubmit}>                
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

export default AdminSearchAside;