import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../server/googleFirebase";

export const AdminSearchResult = ({component}) => {
    const navigate = useNavigate();

    const handleClickFilterButton = () => {
        document.querySelector('.aside-search').style.display = 'block';
    };

    const handleusers = (e) => {
        e.preventDefault();
        navigate("/landlords/admin/users")
        const links = document.querySelectorAll(`.nav-link`);
        for(let i=0; i<links.length; i++) {
            links[i].classList.remove('active')
        };
        e.target.classList.add('active')
    };
    const handledb = (e) => {
        e.preventDefault();
        navigate("/landlords/admin/db")
        const links = document.querySelectorAll(`.nav-link`);
        for(let i=0; i<links.length; i++) {
            links[i].classList.remove('active')
        };
        e.target.classList.add('active')
    };
    const handleregions = (e) => {
        e.preventDefault();
        navigate("/landlords/admin/regions")
        const links = document.querySelectorAll(`.nav-link`);
        for(let i=0; i<links.length; i++) {
            links[i].classList.remove('active')
        };
        e.target.classList.add('active')
    };
    const handleobject = (e) => {
        e.preventDefault();
        navigate("/landlords/admin/createobject")
        const links = document.querySelectorAll(`.nav-link`);
        for(let i=0; i<links.length; i++) {
            links[i].classList.remove('active')
        };
        e.target.classList.add('active')
    };
    const handleQuit = () => {
        logOut();
        navigate("/landlords/signin")
    };
    

    return (
        <>
            <main className="main"> 
                <h1 className="admin-header">Личный кабинет администратора</h1>
                <div className="admin-nav-wrp">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink to="/" onClick={handleusers} className="nav-link" aria-current="page" >Заявки пользователей</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" onClick={handleobject} className="nav-link" >Добавить объект</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" onClick={handledb} className="nav-link" >Опубликованные</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" onClick={handleregions} className="nav-link" >Регионы</NavLink>
                        </li>
                    </ul>
                    <button type="button" onClick={handleClickFilterButton} className="btn btn-primary filter-button-item">
                        <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.5C1.5 1.22386 1.72386 1 2 1H14C14.2761 1 14.5 1.22386 14.5 1.5V3.5C14.5 3.62352 14.4543 3.74267 14.3716 3.83448L10 8.69187V13.5C10 13.7152 9.86228 13.9063 9.65811 13.9743L6.65811 14.9743C6.50564 15.0252 6.33803 14.9996 6.20764 14.9056C6.07726 14.8116 6 14.6607 6 14.5V8.69187L1.62835 3.83448C1.54572 3.74267 1.5 3.62352 1.5 3.5V1.5Z" />
                        </svg>
                        Фильтр
                    </button>
                    <button onClick={handleQuit} type="button" className="btn btn-danger exit-admin-btn" form="landlordForm">Выйти</button>
                </div>
                {component}
            </main>
        </>
    )    
}

export default AdminSearchResult;