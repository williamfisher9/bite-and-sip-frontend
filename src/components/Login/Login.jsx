import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import logoImg from '../../assets/logo.png'

const Login = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({emailAddress: "", password: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({emailAddress: "", password: ""})
    const [loginRequestError, setLoginRequestError] = useState("");

    const {state} = useLocation();

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }
    
    const handleLoginRequest = () => {
        event.preventDefault();
        let hasErrors = false;
        let newErrors = {};

        if(formFields.emailAddress.trim() == ""){
            newErrors["emailAddress"] = "Email address is required"
            hasErrors=true;
        }

        if(formFields.password.trim() == ""){
            newErrors["password"] = "Password field is required"
            hasErrors=true;
        }

        setFormFieldsErrors(newErrors);


        if(!hasErrors){
            axios.post("https://willtechbooth.dev/chatter/api/v1/users/signin", {"email_address": formFields.emailAddress, "password": formFields.password})
            .then((res) => {
                if(res.status == 200){
                    Cookies.set("token", res.data.contents.token);
                    Cookies.set("email_address", res.data.contents.email_address);
                    Cookies.set("user_id", res.data.contents.user_id);
                    setLoginRequestError("")
                    navigate(`/chatter/home/${res.data.contents.user_id}/global`)
                }
            })
            .catch((err) => {
                console.log(err.response.data.contents)
                setLoginRequestError(err.response.data.contents)
            })
        }
    }

    return <div className='outer-form-container'>
        <form className='inner-form-container'>
            <div className='tabs-toggle'>
                <Link to="/biteandsip/login" className='tab' style={{backgroundColor: "#7963c0", color: "white"}}>Sign In</Link>
                <Link to="/biteandsip/register" className='tab'  style={{color: "black"}}>Sign Up</Link>
            </div>

            <img src={logoImg} alt='logo' style={{height: "50px", margin: "20px 0"}} />

            {
            state?.message && 
            <p className='form-message'>{state?.message}</p>
            }

            <div className='form-field-group'>
                <input type='text' placeholder='Email Address' className='text-field' name='emailAddress' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">person</span>
                <p className='form-field-error'>{formFieldsErrors.emailAddress}</p>
            </div>

            <div className='form-field-group'>
                <input type='password' placeholder='Password' className='text-field' name='password' onChange={handleFieldChange} autoComplete='off'/>
                <span className="material-symbols-rounded form-field-icon">password</span>
                <p className='form-field-error'>{formFieldsErrors.password}</p>
            </div>

            <div className='form-link'>
                <Link to={"/biteandsip/forgot-password"}>
                    <span>Forgot password?</span>
                </Link>
            </div>

            <button className='form-btn' onClick={handleLoginRequest}>Sign In</button>
            
            {
                loginRequestError != "" ?
                <p style={{color: "red"}}>{loginRequestError}</p> :
                null
            }



            <span style={{color: "black"}}>Don't have an account? <a href='/biteandsip/register' style={{textDecoration: "underline", color: "black"}}>Sign Up</a></span>
        </form>
    </div>
}

export default Login;