import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const FormSent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigate('/landlords');
    };

    const handleMain = () => {
        navigate('/');
    };

    const redirect = () => {
        navigate('/');
    }
    setTimeout(redirect, 10000); 

    return (
        <>
                <div className="container-field container-primary">
                    <main className="main landlords-main">
                        <h4 className="sent-header">Готово!</h4>
                        <div className="sent-content">Ваша заявка на размещение объекта на нашем сайте успешно отправлена администратору.</div>
                        <div className="sent-content">Мы свяжемся с вами в ближайшее время.</div>
                        <button onClick={handleMain} className="btn btn-primary sent-button-red">Вернуться на главную</button>
                        <button onClick={handleBack} className="btn btn-primary sent-button">Вернуться назад</button>
                    </main>
                </div>   
        </>
    );    
}

export default FormSent;