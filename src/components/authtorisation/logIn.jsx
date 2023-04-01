import { useNavigate } from "react-router-dom";
import { checkadmin, checkuser } from "../../server/googleFirebase";
import AdminPanel from "../admin/adminPanel";
import SendForm from "../sendForm/sendForm";

export const LogIn = () => {

    const navigate = useNavigate();

    const isAuth = checkuser();
    const isAdmin = checkadmin();

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate("/landlords/signin")
        
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        navigate("/landlords/signup")
    };


// TODO Delete before prod
    // return <AdminPanel />
// - ** - //

    if (!isAuth) {    
        return (
            <>
                <div className="container-field container-primary">
                <main className="landlords-main">
                    <h1 className="login-header">Пожалуйста авторизуйтесь или зарегистрируйтесь, что бы получить возможность разместить объект недвижимости на нашем сайте</h1>
                    <button onClick={handleSignIn} className="btn btn-primary button-blue login-button" type="button" form="mainSearch">Войти</button>
                    <button onClick={handleSignUp} className="btn btn-danger button-red login-button" type="button" form="mainSearch">Зарегистрироваться</button>                    
                </main>                
            </div>            
            </>
        );
    }
    if(isAdmin) {
        return <AdminPanel />
    }
    return <SendForm />
}

export default LogIn;