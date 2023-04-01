import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signIn } from "../../server/googleFirebase";
import { async } from '@firebase/util';
// import dotenv from 'dotenv';
// require('dotenv').config()



export const SignIn = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const handleRecaptcha = (token) => {
        setIsVerified(true);
        return token;
      };
   
    // const secretKey = '6Lei1lAkAAAAAEsg2nS6EeyLGbWY9iOCaU_VaDU8';
    // const recaptchaToken = handleRecaptcha;
    
    // fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `secret=${secretKey}&response=${recaptchaToken}`
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.success && data.score > 0.5) {
    //       console.log('reCAPTCHA verification passed!');
    //     } else {
    //       console.log('reCAPTCHA verification failed!');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error verifying reCAPTCHA token:', error);
    //   });
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        if(inputs.email && inputs.password){
            if(isVerified){
                setMessage("Hurray!! you have submitted the form");
                console.log(message)
                try {
                    setError('')
                    setLoading(true)
                    await signIn(inputs.email, inputs.password)
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
                <h1 className="signin-signup-header">Авторизация</h1>
                <p className="signin-signup-description">Введите данные вашей учетной записи, если вы уже зарегистрированы</p>
                <form className="form-floating-wrp" onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            name='email'
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="mail@mail.com" 
                            onChange={handleInputs}
                            value={inputs.email ?? ''}
                            required 
                        />
                        <label htmlFor="floatingInput">e-mail адрес</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            id="floatingPassword" 
                            onChange={handleInputs}
                            value={inputs.password ?? ''}
                            placeholder="Password" 
                            required 
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
                    <div className="spinner-border" role="status">                        
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </>
                    }
                    {error && <p style={{color: 'red', margin: 0, textAlign: 'center'}}>{error}</p>}      
                    <button type="submit" className="btn btn-primary button-blue login-btn">Войти</button>
                </form>                
            </main>
        </div>
        </>
    );
}

export default SignIn;