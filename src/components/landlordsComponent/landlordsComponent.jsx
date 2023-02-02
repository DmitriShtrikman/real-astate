import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkBox, clearInput, select, typing, userAgreement } from "../../store/actions/actions";
import { getAgreementrValue, getInputsValue } from "../../store/selectors/selector";
import { push, set } from "firebase/database";
import { dataRef } from "../../server/googleFirebase";


export const LandlordsComponent = () => {
    const agreement = useSelector(getAgreementrValue);
    const dispatch = useDispatch();
    const filledForm = useSelector(getInputsValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit form")
        push(dataRef, {"img": ["/img/offers/7.jpg"],
            ...filledForm
          })
        dispatch(clearInput())
    };

    const handleInputs = (event) => {
        dispatch(typing(event))
    };

    const handleCheck = (event) => {
        dispatch(checkBox(event))
    };

    const handleSelect = (event) => {
        dispatch(select(event))
    };

    const changeAgreement = () => {
        dispatch(userAgreement(!agreement))
    };



    useEffect(() => {  

        /*Load-photo script*/        
        let inputs = document.querySelectorAll('.input-file');

        Array.prototype.forEach.call(inputs, function (input) {
            let labelVal = document.querySelector('.load-photo-button-text').innerText;
            input.addEventListener('change', function (e) {
                let countFiles = '';
                if (this.files && this.files.length >= 1)
                    countFiles = this.files.length;  
                if (countFiles)
                    document.querySelector('.load-photo-button-text').innerText = 'Выбрано файлов: ' + countFiles;
                else
                    document.querySelector('.load-photo-button-text').innerText = labelVal;
            });
        });       
    });

    return (
        <>
        <div className="container-field container-primary">
            <main className="landlords-main">
                <div className="landloards-header">
                    <h4>Разместите свой объект недвижимости</h4>
                    <p>Заполните форму чтобы продать или сдать в аренду квартиру / офис / торговое помещение или участок</p>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="landlords-form row g-3 needs-validation" id="landlordForm">
                    <div className="landlords-leftside">
                        <div className="col-10">
                            <label htmlFor="ownerName" className="form-label">Имя Фамилия</label>
                            <input onChange={handleInputs} type="text" className="form-control" id="ownerName" placeholder="Имя Фамилия" value={filledForm.ownerName} required/>
                        </div>
                        <div className="col-10">
                            <label htmlFor="email" className="form-label">@ e-mail</label>
                            <input onChange={handleInputs} type="email" className="form-control" id="email" placeholder="mail@mail.com" value={filledForm.email} required/>
                        </div>
                        <div className="col-10">
                                <label htmlFor="tel" className="form-label">Номер телефона</label>                       
                                <input onChange={handleInputs} type="tel" className="form-control" id="phoneNumber" placeholder="tel. +90(535)123-45-67" value={filledForm.phoneNumber} required/>
                        </div>
                        <div className="col-10">                            
                            <label htmlFor="target" className="form-label">Выберите раздел</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="target" value={filledForm.target} required>
                                <option disabled></option>
                                <option value="rent">Аренда</option>
                                <option value="sale">Продажа</option>
                                <option value="new">Новостройка</option>
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="realAstateType" className="form-label">Выберите объект</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="realAstateType" value={filledForm.realAstateType} required>
                                <option disabled></option>
                                <option value="flat">Квартира</option>
                                <option value="house">Дом</option>
                                <option value="office">Офис</option>
                                <option value="land">Участок</option>
                                <option value="shop">Торговое помещение</option>
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="objectName" className="form-label">Название объекта</label>
                            <input onChange={handleInputs} type="text" className="form-control" id="objectName" placeholder="Введите название объекта" value={filledForm.objectName} required/>
                        </div>
                        <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="price" placeholder="Цена" value={filledForm.price} required/>
                                <label className="form-label margin-0 label-padding" htmlFor="price">$&nbsp;USD</label>                            
                            </div>
                        <div className="col-10 landlords-row">
                            <div className="col-6">
                                <label htmlFor="city" className="form-label">Город</label>
                                <select onChange={handleSelect} defaultValue='' className="form-select" id="city" value={filledForm.city} required>
                                    <option disabled ></option>
                                    <option value="Antalya">Анталья</option>
                                    <option value="Alanya">Аланья</option>
                                    <option value="Fethie">Фетие</option>
                                    <option value="Mersin">Мерсин</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <label htmlFor="district" className="form-label">Район</label>
                                <select onChange={handleSelect} defaultValue='' className="form-select" id="district" value={filledForm.district} required>
                                    <option disabled ></option>
                                    <option value="Kepez">Кепез</option>
                                    <option value="Konyalti">Коньялты</option>
                                    <option value="Lara">Лара</option>
                                    <option value="Muratpasha">Муратпаша</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-10">
                            <textarea onChange={handleInputs} className="landlords-textarea" name="address" id="address" placeholder="Адрес" maxLength="90" value={filledForm.address} required></textarea>
                        </div>
                        <div className="col-10">
                            <textarea onChange={handleInputs} className="landlords-textarea-description" name="description" id="description" placeholder="Описание" maxLength="500" value={filledForm.description} required></textarea>
                        </div>                                                
                        <div className="col-10">
                            <div className="form-check">
                                <input onChange={changeAgreement} className="form-check-input" type="checkbox"  id="invalidCheck" required defaultChecked={agreement} />
                                <label className="form-label" htmlFor="invalidCheck">
                                    <Link 
                                    className="form-label-link" 
                                    to='/protection-personal-data'
                                    // target='_blank'
                                    >Я прочитал и согласен с положением о защите персональных данных</Link>                                
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="landlords-rightside">
                        <p className="form-label">Параметры объекта недвижимости</p>
                        <div className="col-10 landlords-row">
                            <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="m2gross" placeholder="m² общая" value={filledForm.m2gross} required/>
                                <label className="form-label margin-0 label-padding" htmlFor="m2gross">m²</label>                            
                            </div>
                            <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="m2net" placeholder="m² жилая" value={filledForm.m2net} required/>
                                <label className="form-label margin-0 label-padding" htmlFor="m2net">m²</label>     
                            </div>
                        </div>
                        <div className="col-10">
                            <label htmlFor="rooms" className="form-label">Количество комнат</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="rooms" value={filledForm.rooms} required>
                                <option disabled ></option>
                                <option value="1+1">Комнаты 1+1</option>
                                <option value="2+1">Комнаты 2+1</option>
                                <option value="3+1">Комнаты 3+1</option>
                                <option value="4+1">Комнаты 4+1</option>
                                <option value="5+1">Комнаты 5+1</option>
                            </select>
                        </div>  
                        <div className="col-10">
                            <label htmlFor="floor" className="form-label">Этаж</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="floor" value={filledForm.floor} required>
                                <option disabled ></option>
                                <option value="0">Этаж / 0</option>
                                <option value="1">Этаж / 1</option>
                                <option value="2">Этаж / 2</option>
                                <option value="3">Этаж / 3</option>
                                <option value="4">Этаж / 4</option>
                                <option value="5">Этаж / 5</option>
                                <option value="6">Этаж / 6</option>
                                <option value="7">Этаж / 7</option>
                                <option value="8">Этаж / 8</option>
                                <option value="9">Этаж / 9</option>
                                <option value="10">Этаж / 10</option>
                                <option value="11">Этаж / 11</option>
                                <option value="12">Этаж / 12</option>
                                <option value="13">Этаж / 13</option>
                                <option value="14">Этаж / 14</option>
                                <option value="15">Этаж / 15</option>
                                <option value="16">Этаж / 16</option>
                                <option value="17">Этаж / 17</option>
                                <option value="18">Этаж / 18</option>
                                <option value="19">Этаж / 19</option>
                                <option value="20">Этаж / 20</option>
                            </select>
                        </div>  
                        <div className="col-10">
                            <label htmlFor="totalFloor" className="form-label">Всего этажей</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="totalFloor" value={filledForm.totalFloor} required>
                            <option disabled ></option>
                                <option value="0">Этаж / 0</option>
                                <option value="1">Этаж / 1</option>
                                <option value="2">Этаж / 2</option>
                                <option value="3">Этаж / 3</option>
                                <option value="4">Этаж / 4</option>
                                <option value="5">Этаж / 5</option>
                                <option value="6">Этаж / 6</option>
                                <option value="7">Этаж / 7</option>
                                <option value="8">Этаж / 8</option>
                                <option value="9">Этаж / 9</option>
                                <option value="10">Этаж / 10</option>
                                <option value="11">Этаж / 11</option>
                                <option value="12">Этаж / 12</option>
                                <option value="13">Этаж / 13</option>
                                <option value="14">Этаж / 14</option>
                                <option value="15">Этаж / 15</option>
                                <option value="16">Этаж / 16</option>
                                <option value="17">Этаж / 17</option>
                                <option value="18">Этаж / 18</option>
                                <option value="19">Этаж / 19</option>
                                <option value="20">Этаж / 20</option>
                            </select>
                        </div> 
                        <div className="col-10">
                            <label htmlFor="heating" className="form-label">Отопление</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="heating" value={filledForm.heating} required>
                                <option disabled ></option>
                                <option value="Not">Отопление / Нет</option>
                                <option value="Gas">Отопление / Газ</option>
                                <option value="Electro">Отопление / Электричество</option>                 
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="airConditioning" className="form-label">Кондиционер</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="airConditioning" value={filledForm.airConditioning} required>
                                <option disabled ></option>
                                <option value='true'>Кондиционер / Есть</option>
                                <option value='false'>Кондиционер / Нет</option>           
                            </select>
                        </div> 
                        <div className="col-10">
                            <label htmlFor="bathrooms" className="form-label">Количество ванных комнат</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="bathrooms" value={filledForm.bathrooms} required>
                                <option disabled ></option>
                                <option value="0">Ванных комнат / 0</option>
                                <option value="1">Ванных комнат / 1</option>
                                <option value="2">Ванных комнат / 2</option>
                                <option value="3">Ванных комнат / 3</option> 
                                <option value="4">Ванных комнат / 4</option>                
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="balcony" className="form-label">Балкон</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="balcony" value={filledForm.balcony} required>
                                <option disabled ></option>
                                <option value="0">Балкон / 0</option>
                                <option value="1">Балкон / 1</option>
                                <option value="2">Балкон / 2</option> 
                                <option value="3">Балкон / 3</option>  
                                <option value="4">Балкон / 4</option> 
                                <option value="5">Балкон / 5</option>              
                            </select>
                        </div>  
                        <div className="col-10">
                            <label htmlFor="furniture" className="form-label">Мебель</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="furniture" value={filledForm.furniture} required>
                                <option disabled ></option>
                                <option value='true'>Мебель / Есть</option>
                                <option value='false'>Мебель / Нет</option>           
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="kitchen" className="form-label">Кухонная мебель</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="kitchen" value={filledForm.kitchen} required>
                                <option disabled ></option>
                                <option value='true'>Кухонная мебель / Есть</option>
                                <option value='false'>Кухонная мебель / Нет</option>           
                            </select>
                        </div>                        
                        <div className="col-10">
                            <p className="form-label">Бытовая техника</p>
                            <div className="form-check">
                                <input onChange={handleCheck} defaultChecked={false}className="form-check-input" type="checkbox" id="stove" name=""/>
                                <label className="form-label" htmlFor="stove">Кухонная плита</label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleCheck} defaultChecked={false} className="form-check-input" type="checkbox" id="dishwasher" name=""/>
                                <label className="form-label" htmlFor="dishwasher">Посудомоечная машина</label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleCheck} defaultChecked={false} className="form-check-input" type="checkbox" id="washingMachine" name=""/>
                                <label className="form-label" htmlFor="washingMachine">Стиральная машина</label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleCheck} defaultChecked={false} className="form-check-input" type="checkbox" id="refrigerator" name=""/>
                                <label className="form-label" htmlFor="refrigerator">Холодильник</label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleCheck} defaultChecked={false} className="form-check-input" type="checkbox" id="microwave" name=""/>
                                <label className="form-label" htmlFor="microwave">Микроволновая печь</label>
                            </div>                                                       
                        </div>
                        <div className="col-10">
                            <label className="btn btn-primary landlord-button" htmlFor="img"><span className="load-photo-button-text">Загрузите фото</span></label>
                            <input className='input-file' id="img" type="file" name="photo" multiple accept="image/jpeg"></input>
                        </div>                         
                    </div>
                </form>
                <button type="submit" className="btn btn-primary load-photo-button" form="landlordForm">Отправить</button>                
            </main>
        </div>
        </>
    );
}

export default LandlordsComponent;

