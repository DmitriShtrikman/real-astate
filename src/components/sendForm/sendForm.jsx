import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkBox, clearInput, select, selectBool, typing, typingSecret, userAgreement } from "../../store/actions/actions";
import { getAgreementrValue, getFullDataBase, getInputsValue, getRegionsDataBase } from "../../store/selectors/selector";
import { push } from "firebase/database";
import { dataUsersRef, logOut, storage } from "../../server/googleFirebase";
import { v4 as uuidv4 } from 'uuid';
import { uploadBytes , ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";


export const SendForm = () => {
    const agreement = useSelector(getAgreementrValue);
    const dispatch = useDispatch();
    const filledForm = useSelector(getInputsValue);
    const navigate = useNavigate();   
    const fullDataBase = useSelector(getFullDataBase); 
    const [imgsLinks, setImgsLinks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const [done, setDone] = useState(false)
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
        const district = regions.find(element=>element.id === filledForm.
            city)
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


    // Get cuurent user
    const auth = getAuth();
    const userId = auth.currentUser.uid;


    const handleSubmit = (event) => {
        event.preventDefault();
        setPageLoading(true);
        console.log("Well done! Form submited.")

        // Create new number
        let newIdArray = [];
        for(let i=0; i<fullDataBase.length; i++) {
            newIdArray.push(fullDataBase[i].number)
        }
        const number = String(Math.max(...newIdArray) + 3);
        // console.log(id)

        // Create current date
        function getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}, ${month}, ${day}`;
          }

        // Create files links
        let imgURLs = [];
        imgsLinks.forEach(
            element => {
                getDownloadURL(ref(storage, element))
                .then((url) => {
                    imgURLs.push(url);
                })
                .catch((error) => {
                    console.log(`Link not created. Error: ${error}`)
                });            
            }
        );        
        
        function createObject() { 
            push(dataUsersRef, 
                {
                    "date": getCurrentDate(), 
                    "img": imgURLs, 
                    "number": number, 
                    "uuid": uuidv4(),
                    ...filledForm
                }   
            );            
            setPageLoading(false);
            navigate("/landlords/sent")
        }        
        setTimeout(createObject, 3000); 

        dispatch(clearInput())
    };

    const handleInputs = (event) => {
        dispatch(typing(event))
    };

    const handleSecretInputs = (event) => {

        dispatch(typingSecret(event))
    };

    const handleCheck = (event) => {
        dispatch(checkBox(event))
    };

    const handleSelect = (event) => {
        dispatch(select(event))
    };

    const handleBooleanSelect = (event) => {
        dispatch(selectBool(event))
    };

    const handleQuit = () => {
        logOut();
        navigate("/landlords/signin")
    };

    const changeAgreement = () => {
        dispatch(userAgreement(!agreement))
    };

    // const increaseInputValue = (event) => {
    //     event.preventDefault(); 
    //     const input = document.getElementById(event.target.name);        
    //     input.value = parseInt(input.value) + 1;
    //     filledForm.floor = input.value;
    //     dispatch(typing(event))
    // };
    // const decreaseInputValue = (event) => {
    //     event.preventDefault(); 
    //     const input = document.getElementById(event.target.name);        
    //     input.value = parseInt(input.value) - 1;
    //     filledForm.floor = input.value;
    //     dispatch(typing(event))
    // };

    const handleInputFile = (event) => {
        event.preventDefault(); 
        console.log(event.target.files)
        const fileList = event.target.files;       
        console.log(fileList);
        const file = fileList[0];
        setDone(false)

        const storageRef = ref(storage, `images/${userId}/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        let URLSArr = [];
        setLoading(true);
        for (let i=0; i<fileList.length; i++) {
            console.log(fileList[i]);  
            const storageRef = ref(storage, `images/${userId}/${fileList[i].name}`);
            URLSArr.push(`images/${userId}/${fileList[i].name}`);

            uploadBytes(storageRef, fileList[i]).then((snapshot) => {
                setLoading(false);
                setDone(true);                
                document.querySelector("#submitButton").disabled = false;
                console.log('Uploaded a blob or file!');
            });          
        }
        console.log(`URLSArr: ${URLSArr}`);
        setImgsLinks(URLSArr);  
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
                            <input onChange={handleSecretInputs} type="text" className="form-control" id="ownerName" placeholder="Имя Фамилия" value={filledForm.ownerName} required/>
                        </div>
                        <div className="col-10">
                            <label htmlFor="email" className="form-label">@ e-mail</label>
                            <input onChange={handleSecretInputs} type="email" className="form-control" id="email" placeholder="mail@mail.com" value={filledForm.email} required/>
                        </div>
                        <div className="col-10">
                                <label htmlFor="tel" className="form-label">Номер телефона</label>                       
                                <input onChange={handleSecretInputs} type="tel" className="form-control" id="phoneNumber" placeholder="tel. +90(535)123-45-67" value={filledForm.phoneNumber} required/>
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
                        <label htmlFor="price" className="form-label">Цена</label>
                        <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="price" placeholder="Цена" value={filledForm.price} required/>
                                <label className="form-label margin-0 label-padding color-red" htmlFor="price">$&nbsp;USD</label>                            
                            </div>
                        <div className="col-10 landlords-row">
                            <div className="col-6">
                                <label htmlFor="city" className="form-label">Город</label>
                                <select onChange={handleSelect} defaultValue='' className="form-select" id="city" value={filledForm.city} required>
                                    <option disabled ></option>
                                    {getCountryList()}
                                    <option value="other">Другой ...</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <label htmlFor="district" className="form-label">Район</label>
                                <select onChange={handleSelect} defaultValue='' className="form-select" id="district" value={filledForm.district} required>
                                    <option disabled ></option>
                                    {getDistrict()}
                                    <option value="other">Другой ...</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-10">
                            <textarea onChange={handleSecretInputs} className="landlords-textarea" name="address" id="address" placeholder="Адрес" maxLength="90" value={filledForm.address} required></textarea>
                        </div>
                        <div className="col-10">
                            <textarea onChange={handleInputs} className="landlords-textarea-description" name="description" id="description" placeholder="Описание" maxLength="500" value={filledForm.description} required></textarea>
                        </div>                                                
                        <p className="form-label">Параметры объекта недвижимости</p>
                        <div className="col-10 landlords-row">
                            <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="m2gross" placeholder="m² общая" value={filledForm.m2gross} required/>
                                <label className="form-label margin-0 label-padding" htmlFor="m2gross">m²</label>                            
                            </div>
                            <div className="col-5 flex-row">
                                <input onChange={handleInputs} type="number" className="form-control" id="m2net" placeholder="m² жилая" value={filledForm.m2net}/>
                                <label className="form-label margin-0 label-padding" htmlFor="m2net">m²</label>     
                            </div>
                        </div>
                    </div>
                    <div className="landlords-rightside">                        
                        <div className="col-10">
                            <label htmlFor="rooms" className="form-label">Количество комнат</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="rooms" value={filledForm.rooms}>
                                <option disabled ></option>
                                <option value="0+1">Комнаты 0+1</option>
                                <option value="1+0">Комнаты 1+0</option> 
                                <option value="1+1">Комнаты 1+1</option>
                                <option value="1+1">Комнаты 1+2</option>
                                <option value="2+0">Комнаты 2+0</option>
                                <option value="2+1">Комнаты 2+1</option>
                                <option value="2+2">Комнаты 2+2</option>
                                <option value="3+0">Комнаты 3+0</option>
                                <option value="3+1">Комнаты 3+1</option>
                                <option value="3+2">Комнаты 3+2</option>
                                <option value="4+0">Комнаты 4+0</option>
                                <option value="4+1">Комнаты 4+1</option>
                                <option value="4+2">Комнаты 4+2</option>
                                <option value="5+0">Комнаты 5+0</option>
                                <option value="5+1">Комнаты 5+1</option>
                                <option value="5+2">Комнаты 5+2</option>
                                <option value="6+0">Комнаты 6+0</option>
                                <option value="6+1">Комнаты 6+1</option>
                                <option value="6+2">Комнаты 6+2</option>
                                <option value="7+0">Комнаты 7+0</option>
                                <option value="7+1">Комнаты 7+1</option>
                                <option value="7+2">Комнаты 7+2</option>
                            </select>
                        </div>  
                        <div className="col-10">
                            <label htmlFor="floor" className="form-label">Этаж</label>
                            <div className="input-number-wrp">
                                <input type="number" onChange={handleInputs} min="0" max="100" defaultValue="" className="form-control input-number" id="floor" value={filledForm.floor} />
                                {/* <button name="floor" onClick={decreaseInputValue} className="form-control input-number-btn">-</button>
                                <button name="floor" onClick={increaseInputValue} className="form-control input-number-btn">+</button> */}
                            </div>
                        </div>  
                        <div className="col-10">
                            <label htmlFor="totalFloor" className="form-label">Всего этажей</label>
                            <div className="input-number-wrp">
                                <input type="number" onChange={handleInputs} min="0" max="100" defaultValue="" className="form-control input-number" id="totalFloor" value={filledForm.totalFloor} />
                                {/* <button name="totalFloor" onClick={decreaseInputValue} className="form-control input-number-btn">-</button>
                                <button name="totalFloor" onClick={increaseInputValue} className="form-control input-number-btn">+</button> */}
                            </div>

                        </div> 
                        <div className="col-10">
                            <label htmlFor="heating" className="form-label">Отопление</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="heating" value={filledForm.heating}>
                                <option disabled ></option>
                                <option value="Gas">Отопление / Газ</option>
                                <option value="Electro">Отопление / Электричество</option> 
                                <option value="Not">Отопление / Нет</option>                
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="airConditioning" className="form-label">Кондиционер</label>
                            <select onChange={handleBooleanSelect} defaultValue='' className="form-select" id="airConditioning"  >
                                <option disabled ></option>
                                <option value={1}>Кондиционер / Есть</option>
                                <option value={0}>Кондиционер / Нет</option>           
                            </select>
                        </div> 
                        <div className="col-10">
                            <label htmlFor="bathrooms" className="form-label">Количество ванных комнат</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="bathrooms" value={filledForm.bathrooms} >
                                <option disabled ></option>
                                <option value="0">Ванных комнат / 0</option>
                                <option value="1">Ванных комнат / 1</option>
                                <option value="2">Ванных комнат / 2</option>
                                <option value="3">Ванных комнат / 3</option> 
                                <option value="4">Ванных комнат / 4</option>
                                <option value="5">Ванных комнат / 5</option>
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="balcony" className="form-label">Балкон</label>
                            <select onChange={handleSelect} defaultValue='' className="form-select" id="balcony" value={filledForm.balcony} >
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
                            <select onChange={handleBooleanSelect} defaultValue='' className="form-select" id="furniture" >
                                <option disabled ></option>
                                <option value={1}>Мебель / Есть</option>
                                <option value={0}>Мебель / Нет</option>           
                            </select>
                        </div>
                        <div className="col-10">
                            <label htmlFor="kitchen" className="form-label">Кухонная мебель</label>
                            <select onChange={handleBooleanSelect} defaultValue='' className="form-select" id="kitchen" >
                                <option disabled ></option>
                                <option value={1}>Кухонная мебель / Есть</option>
                                <option value={0}>Кухонная мебель / Нет</option>           
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
                        <div className="col-10 input-file-wrp">
                            <p className="form-label color-red">Загрузите фото вашего объекта, максимальный размер 5 Мб</p>
                            <label className="btn btn-primary landlord-button" htmlFor="img"><span className="load-photo-button-text">Загрузите фото</span></label>
                            <input className='input-file' id="img" type="file" name="photo" multiple accept="image/jpeg" onChange={handleInputFile} required></input>
                            {loading && 
                                <>
                                <p style={{color: 'red', fontSize: '14px', fontWeight: 700, margin: 0, textAlign: 'center'}}>Файлы загружаются...</p>
                                <div style={{marginTop: '4px'}} className="spinner-border text-danger" role="status">                        
                                    <span className="visually-hidden">Файлы загружаются...</span>
                                </div>
                                </>
                            }  
                            {done && <p className="done">Файлы загружены</p>}                          
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
                </form>
                <button id="submitButton" type="submit" className="btn btn-primary load-photo-button" form="landlordForm" disabled>Отправить</button>
                {pageLoading && 
                        <>
                        <p style={{color: 'red', fontSize: '14px', fontWeight: 700, margin: 0, textAlign: 'center'}}>Загрузка...</p>
                        <div style={{marginTop: '4px', marginBottom: '6px'}} className="spinner-border text-danger" role="status">                        
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                        </>
                    }  
        <button onClick={handleQuit} type="button" className="btn btn-danger exit-button" form="landlordForm">Выйти</button>
            </main>
        </div>
        </>
    );
}

export default SendForm;
