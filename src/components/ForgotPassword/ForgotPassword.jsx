import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
import { useState } from 'react';
import axios from 'axios';
import logoImg from '../../assets/logo.png'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({emailAddress: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({emailAddress: ""})
    const [forgotPasswordRequestError, setForgotPasswordRequestError] = useState("");

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }
    
    const handleForgotPasswordRequest = () => {
        event.preventDefault();

        let hasErrors = false;
        let newErrors = {};

        if(formFields.emailAddress.trim() == ""){
            newErrors["emailAddress"] = "Email address is required"
            hasErrors=true;
        }

        setFormFieldsErrors(newErrors);

        if(!hasErrors){
            axios.post("https://willtechbooth.dev/chatter/api/v1/users/forgot-password", {"email_address": formFields.emailAddress})
            .then((res) => {
                if(res.status == 200){
                    console.log(res)
                    setForgotPasswordRequestError("")
                    navigate('/chatter/login', { state: { message: res.data.contents } })
                }
            })
            .catch((err) => {
                console.log(err.response.data.contents)
                setForgotPasswordRequestError(err.response.data.contents)
            })
        }
    }



return <div className='outer-form-container'>
        <form className='inner-form-container'>
            <img src={logoImg} alt='logo' style={{height: "50px", margin: "20px 0"}} />


            <div className='form-field-group'>
                <input type='text' placeholder='Email Address' className='text-field' name='emailAddress' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">person</span>
                <p className='form-field-error'>{formFieldsErrors.emailAddress}</p>
            </div>

            <button className='form-btn' onClick={handleForgotPasswordRequest}>Reset Password</button>
            
            {
                forgotPasswordRequestError != "" ?
                <p style={{color:"red"}}>{forgotPasswordRequestError}</p> :
                null
            }

<div className='form-link' style={{textAlign: "center"}}>
                Move back to login page?&nbsp;
                <Link to={"/biteandsip/login"}>
                    <span>Sign In</span>
                </Link>
            </div>
            </form>
    </div>
}

export default ForgotPassword;