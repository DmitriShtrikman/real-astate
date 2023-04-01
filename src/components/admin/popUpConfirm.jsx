import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChosenObject } from "../../store/selectors/selector";
import { getDatabase, push, ref, remove } from "firebase/database";

export const PopUpConfirm = (props) => {
    const navigate = useNavigate();
    const db = getDatabase(); 
    const newObject = useSelector(getChosenObject);

    const handleSave = (e) => {
        e.preventDefault();
        const newObjectId = newObject.id;     
        delete newObject.id;

        push(ref(db, props.props), newObject); 
        remove(ref(db, props.props + '/'+ newObjectId)); 
        navigate(0)
    }

    return (
        <>
            <div className="admin-cover">
                <div className="landlords-main confirm-window">
                    <h4 className="confirm-window-header">Подтвердить сохранение?</h4>
                    <div className="confirm-window-btn-group">
                        <button onClick={() => navigate(0)} className="btn btn-primary landlord-button confirm-window-btn">Отменить</button>   
                        <button onClick={handleSave} className="btn btn-danger landlord-button admin-landlord-btn confirm-window-btn">Сохранить</button>  
                    </div>
                </div>
            </div>
        </>
    )    
}

export default PopUpConfirm;