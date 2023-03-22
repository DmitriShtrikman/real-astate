import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sorterValue } from "../../store/actions/actions";
import { getPageParamValue, getPageValue } from "../../store/selectors/selector";

export const Sorter = (props) => {
const navigate = useNavigate();
const dispatch = useDispatch();
const pageKey = useSelector(getPageValue);
const totalValue = useSelector(getPageParamValue);
const [sortValue, setSortValue] = useState("sort");

const handleClickMapButton = () => {
    navigate('/map')
};
const handleClickFilterButton = () => {
    document.querySelector('.aside-search').style.display = 'block';
};
const handleChangeValue = (e) => {
    setSortValue(e.target.value);
    dispatch(sorterValue(e.target.value));
};

const page = {
    rent: 'Аренда',
    sale: 'Продажа',
    new: 'Новостройки',
};

return (
    <>
        <div className="filter">
            <div className="sorter-side">
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
                        <li className="breadcrumb-item active" aria-current="page">{props.pageParametr}</li>
                    </ol>
                </nav>
                <p className="filter-result-notification">Найдено <span>{totalValue}</span> объектов в разделе <span>{page[pageKey]}</span>&nbsp;<span>{props.pageParametr}</span></p>
            </div>
            <div className="filter-buttons">                    
                <button type="button" onClick={() => handleClickMapButton()} className="btn btn-primary map-button-item">Показать на карте</button>
                <button type="button" onClick={handleClickFilterButton} className="btn btn-primary filter-button-item">
                    <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1.5C1.5 1.22386 1.72386 1 2 1H14C14.2761 1 14.5 1.22386 14.5 1.5V3.5C14.5 3.62352 14.4543 3.74267 14.3716 3.83448L10 8.69187V13.5C10 13.7152 9.86228 13.9063 9.65811 13.9743L6.65811 14.9743C6.50564 15.0252 6.33803 14.9996 6.20764 14.9056C6.07726 14.8116 6 14.6607 6 14.5V8.69187L1.62835 3.83448C1.54572 3.74267 1.5 3.62352 1.5 3.5V1.5Z" />
                    </svg>
                    Фильтр
                </button>
                <select value={sortValue} onChange={handleChangeValue} className="form-select" aria-label="Default select example">
                    <option disabled value="sort">Сортировать...</option>
                    <option value="expensive">По цене (Сначала дороже)</option>
                    <option value="chipiest">По цене (Сначала дешевле)</option>
                    <option value="new">По дате (Сначала новые)</option>
                    <option value="old">По дате (Сначала старые)</option>
                </select>                    
            </div>
        </div>
    </>
)}

export default Sorter;