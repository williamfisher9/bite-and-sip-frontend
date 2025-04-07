import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
import { useState } from 'react';
import axios from 'axios';
import logoImg from '../../assets/logo.png'
import { BACKEND_URL } from '../../constants/Constants';
import FormButton from '../FormButton/FormButton';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({username: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({username: ""})
    const [forgotPasswordRequestError, setForgotPasswordRequestError] = useState("");

    const [loading, setLoading] = useState(false)

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }
    
    const handleForgotPasswordRequest = () => {
        event.preventDefault();

        let hasErrors = false;
        let newErrors = {};

        if(formFields.username.trim() == ""){
            newErrors["username"] = "Email address is required"
            hasErrors=true;
        }

        setFormFieldsErrors(newErrors);

        if(!hasErrors){
            setLoading(true)
            axios.post(`${BACKEND_URL}/api/v1/app/public/forgot-password`, {"username": formFields.username})
            .then((res) => {
                setLoading(false)
                if(res.status == 200){
                    setForgotPasswordRequestError("")
                    navigate('/biteandsip/login', { state: { message: res.data.contents } })
                }
            })
            .catch((err) => {
                setLoading(false)
                setForgotPasswordRequestError(err.response.data.contents)
            })
        }
    }



return <div className='outer-container'>
        <form className='form-container'>
            <img src={logoImg} alt='logo' style={{height: "50px", margin: "20px 0"}} />

            <div className='inner-form-container'>
            <div className='form-field-group'>
                <input type='text' placeholder='Email Address' className='text-field' name='username' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">person</span>
                <p className='form-field-error'>{formFieldsErrors.username}</p>
            </div>

            

            <FormButton handleRequest={handleForgotPasswordRequest} isLoading={loading}>
            <div className="editor-action">
              <span>Reset Password</span>
            </div>
          </FormButton> 
            
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

            </div>
            </form>
    </div>
}

export default ForgotPassword;