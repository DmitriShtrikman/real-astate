import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegionsDataBase } from "../../store/selectors/selector";
import { getDatabase, ref, set, get, update, push, remove } from "firebase/database";
import { regionDataRef } from "../../server/googleFirebase";

export const AdminRegions = () => {
    const regions = useSelector(getRegionsDataBase);
    const [choosenRegion, setChoosenRegion] = useState()
    const [newCity, setNewCity] = useState("")
    const [newDistrict, setNewDistrict] = useState("")
    const db = getDatabase();

    console.log(choosenRegion)

    function updateRegionsData(newCity) {
        push(regionDataRef, 
            {city: newCity}
        );
    }    
    const inputCity = (e) => {
        setNewCity(e.target.value);        
    };
    const addCity = () => {
        updateRegionsData(newCity)
    };
    const removeCity = (e) => {
        remove(ref(db, 'regions/' + e.target.value))
    };

    function updateDistrictsData(newDistrict) {
        push(ref(db, 'regions/' + choosenRegion), newDistrict);
    }
    const inputDistrict = (e) => {
        setNewDistrict(e.target.value);
    };
    const addDistrict = (e) => {
        updateDistrictsData(newDistrict);
    };
    const removeDistrict = (e) => {
        remove(ref(db, 'regions/' + e.target.value + '/' + e.target.id))
    };
    

    const getCityList = () => {
        try {
            let regionstArr = []
            for (let i in regions) {
                regionstArr.push(
                <div className="admin-btngroup">
                    <button className="btn btn-primary admin-city-btn" onClick={changeRegion} key={regions[i].id} id={regions[i].id}>{regions[i].city}
                    </button>                
                    <button onClick={removeCity} value={regions[i].id} className="btn btn-primary admin-city-btn-remove">X
                    </button>
                </div>
                )
            }
            return regionstArr
        } catch (error) {
        }
    }

    const changeRegion = (e) => {
        e.preventDefault();
        setChoosenRegion(e.target.id);
    }

    const getDistrict = () => {
        try {
        const district = regions.find(element=>element.id === choosenRegion)
        let districtArr = []
        for (let i in district) {
            if (i!='city' && i!='id') {                
                districtArr.push(
                <div className="admin-btngroup">
                    <p  className="admin-disttrict-item" key={district[i]} value={district[i]}>{district[i]}
                    </p>
                    <button 
                        onClick={removeDistrict} 
                        value={choosenRegion} 
                        id={Object.keys(district).find(key => district[key] === district[i])} 
                        className="admin-district-btn-remove">
                            x
                    </button>
                </div>
                )
            }
        }
        return districtArr
        } catch (error) {
        }
    }

    return (
        <>
        <div className="admin-panel-wrp">
            <div className="admin-panel-item">            
                <div className="admin-city-btn-wrp">
                    <h4 className="admin-city-btn-header">Город</h4>
                    {getCityList()}
                    <input onChange={inputCity} type="text" className="form-control admin-input-city"/>
                    <button onClick={addCity} className="btn btn-primary admin-city-btn-red">Добавить город</button>                    
                </div>
                <div className="admin-district-btn-wrp">
                    <h4 className="admin-city-btn-header">Район</h4>
                    {getDistrict()}
                    <input onChange={inputDistrict} type="text" className="form-control admin-input-city"/>
                    <button onClick={addDistrict} className="btn btn-primary admin-city-btn-red">Добавить район</button>
                </div>
            </div>

        </div>
        </>
    )    
}

export default AdminRegions;