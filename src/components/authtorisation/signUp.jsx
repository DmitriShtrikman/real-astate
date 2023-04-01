import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../server/googleFirebase";

export const SignUp = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [message, setMessage] = useState("");
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const captchaRef = useRef(null);
    const [isVerified, setIsVerified] = useState(false);

    const handleRecaptcha = (token) => {
        setIsVerified(true);
        return token;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if(inputs.email && inputs.password){
            if(isVerified){
                setMessage("Hurray!! you have submitted the form");
                console.log(message)
                try {
                    setError('')
                    setLoading(true)
                    await signUp(inputs.email, inputs.password)
                    navigate('/landlords')
                  } catch (error) {
                    setError(error)
                    console.log("invalid login")
                    navigate('/landlords')
                  } finally {
                    setLoading(false)
                    setInputs({email: '', password: ''})
                  }
                // setError("Sorry!! Token invalid");                
            }else{
                setError("Подтвердите что вы не робот или перезагрузите страницу");
                console.log(error)
            }
        } else {
            setError("Поля e-mail и пароль должны быть заполнены");
            console.log(error)
        }
    };

    const handleInputs = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    };



    return (
        <>
            <div className="container-field container-primary">
            <main className="landlords-main">
                <h1 className="signin-signup-header">Регистрация</h1>
                <p className="signin-signup-description">Создайте новую учетную запись</p>
                <form className="form-floating-wrp" onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            name='email' 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="mail@mail.com" 
                            required 
                            onChange={handleInputs}
                            value={inputs.email ?? ''}
                        />
                        <label htmlFor="floatingInput">E-mail адрес</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            id="floatingPassword" 
                            placeholder="Password" 
                            required 
                            onChange={handleInputs}
                            value={inputs.password ?? ''}
                        />
                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        onChange={handleRecaptcha}
                    />  
                    {loading && 
                    <>
                    <p>Loading.....</p>
                    <div class="spinner-border" role="status">                        
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </>
                    }
                    {error && <p style={{color: 'red', margin: 0, textAlign: 'center'}}>{error}</p>} 
                    <button type="submit" className="btn btn-primary button-blue login-btn">Зарегистрироваться</button>
                </form>
                {loading && <p>Loading.....</p>}
                {error && <p style={{color: 'red'}}>{error.message}</p>}
            </main>
        </div>
        </>
    );
}

export default SignUp;