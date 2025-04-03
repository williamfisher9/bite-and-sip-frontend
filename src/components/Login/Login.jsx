import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import logoImg from '../../assets/logo.png'
import { BACKEND_URL } from '../../constants/Constants';
import { MenuContext } from '../../context/Menu';

const Login = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({emailAddress: "", password: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({emailAddress: "", password: ""})
    const [loginRequestError, setLoginRequestError] = useState("");

    const {updateMenuItemsState} = useContext(MenuContext)

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
            axios.post(`${BACKEND_URL}/api/v1/app/public/auth/login`, {"username": formFields.emailAddress, "password": formFields.password})
            .then((res) => {
                if(res.status == 200){
                    updateMenuItemsState(res.data.message.menuItems)
                    Cookies.set("token", res.data.message.token);
                    Cookies.set("username", res.data.message.username);
                    Cookies.set("userId", res.data.message.userId);
                    Cookies.set("authorityId", res.data.message.authorityId);
                    Cookies.set("menuItems", JSON.stringify(res.data.message.menuItems));
                    Cookies.set("isAuthenticated", true);
                    setLoginRequestError("")
                    navigate(`${res.data.message.homePageUrl}`)
                }
            })
            .catch((err) => {
                setLoginRequestError(err.response.data.message)
            })
        }
    }

    const [passwordFieldType, setPasswordFieldType] = useState("password")
    const [passwordFieldVisibilityIcon, setPasswordFieldVisibilityIcon] = useState("visibility");

    const handleShowPassword = () => {
        if(passwordFieldType == "password"){
            setPasswordFieldType("text")
            setPasswordFieldVisibilityIcon("visibility_off")
        } else {
            setPasswordFieldType("password")
            setPasswordFieldVisibilityIcon("visibility")
        }
    }

    return <div className='outer-form-container'>
        <form className='inner-form-container'>
            <div className='tabs-toggle'>
                <Link to="/biteandsip/login" className='tab' style={{backgroundColor: "#7963c0", color: "white"}}>Sign In</Link>
                <Link to="/biteandsip/register" className='tab'  style={{color: "black"}}>Sign Up</Link>
            </div>

            <img src={logoImg} alt='logo' style={{height: "50px", margin: "5px 0"}} />

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
                <input type={passwordFieldType} placeholder='Password' className='text-field' name='password' onChange={handleFieldChange} autoComplete='off'/>
                <span className="material-symbols-rounded form-field-icon">password</span>
                <span className="material-symbols-rounded show-password-icon" onClick={handleShowPassword}>{passwordFieldVisibilityIcon}</span>
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

            
            <div className='form-link' style={{textAlign: "center"}}>
                Don't have an account?&nbsp;
                <Link to={"/biteandsip/register"}>
                    <span>Sign Up</span>
                </Link>
            </div>


        </form>
    </div>
}

export default Login;