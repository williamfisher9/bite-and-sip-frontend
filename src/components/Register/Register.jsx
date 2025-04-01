import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Register.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import logoImg from '../../assets/logo.png'
import { BACKEND_URL } from '../../constants/Constants';

const Register = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({emailAddress: "", firstName: "", lastName: "", password: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({emailAddress: "", firstName: "", lastName: "", password: ""})
    const [registerRequestError, setRegisterRequestError] = useState("");
    const [passwordHasErrors, setPasswordHasErrors] = useState({rule1: true, rule2: true, rule3: true, rule4: true})

    const {state} = useLocation();

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

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})

        if(event.target.name == "password"){
            let passwordErrors = {...passwordHasErrors}
            if(event.target.value.length >= 8){
                passwordErrors = {...passwordErrors, rule1: false}
            } else {
                passwordErrors = {...passwordErrors, rule1: true}
            }

            if(/[A-Z]/.test(event.target.value) && /[a-z]/.test(event.target.value)){
                passwordErrors = {...passwordErrors, rule2: false}
            } else {
                passwordErrors = {...passwordErrors, rule2: true}
            }

            if(/[0-9]/.test(event.target.value)){
                passwordErrors = {...passwordErrors, rule3: false}
            } else {
                passwordErrors = {...passwordErrors, rule3: true}
            }

            if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(event.target.value)){
                passwordErrors = {...passwordErrors, rule4: false}
            } else {
                passwordErrors = {...passwordErrors, rule4: true}
            }

            setPasswordHasErrors(passwordErrors)
        }
    }
    
    const handleSignUpRequest = () => {
        event.preventDefault();
        let hasErrors = false;
        let newErrors = {};

        if(formFields.emailAddress.trim() == ""){
            newErrors["emailAddress"] = "Email address is required"
            hasErrors=true;
        }

        if(formFields.firstName.trim() == ""){
            newErrors["firstName"] = "First name field is required"
            hasErrors=true;
        }

        if(formFields.lastName.trim() == ""){
            newErrors["lastName"] = "Last name field is required"
            hasErrors=true;
        }

        if(formFields.password.trim() == ""){
            newErrors["password"] = "Password field is required"
            hasErrors=true;
        } else {
            newErrors["password"] = ""
        }

        if(passwordHasErrors["rule1"] || passwordHasErrors["rule2"] || passwordHasErrors["rule3"] || passwordHasErrors["rule4"]){
            newErrors["password"] = "Password is invalid"
            hasErrors=true;
        } else {
            newErrors["password"] = ""
        }

        setFormFieldsErrors(newErrors);


        if(!hasErrors){
            axios.post(`${BACKEND_URL}/api/v1/app/public/auth/register`, {"username": formFields.emailAddress, 
                                                                    "firstName": formFields.firstName, 
                                                                    "lastName": formFields.lastName, 
                                                                    "password": formFields.password})
            .then((res) => {
                if(res.status == 201){
                    setRegisterRequestError("")
                    navigate('/biteandsip/login', { state: { message: 'VERIFY YOUR EMAIL ADDRESS TO LOGIN' } })
                }
            })
            .catch((err) => {
                setRegisterRequestError(err.response.data.message)
            })
        }
    }

    

    return <div className='outer-form-container'>
        <form className='inner-form-container'>
            <div className='tabs-toggle'>
                <Link to="/biteandsip/login" className='tab' style={{color: "black"}}>Sign In</Link>
                <Link to="/biteandsip/register" className='tab' style={{backgroundColor: "#7963c0", color: "white"}}>Sign Up</Link>
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
                <input type='text' placeholder='First Name' className='text-field' name='firstName' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">id_card</span>
                <p className='form-field-error'>{formFieldsErrors.firstName}</p>
            </div>

            <div className='form-field-group'>
                <input type='text' placeholder='Last Name' className='text-field' name='lastName' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">id_card</span>
                <p className='form-field-error'>{formFieldsErrors.lastName}</p>
            </div>

            <div className='form-field-group'>
                <input type='text' placeholder='Phone Number' className='text-field' name='phoneNumber' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">phone</span>
                <p className='form-field-error'>{formFieldsErrors.phoneNumber}</p>
            </div>

            <div className='form-field-group'>
                <input type={[passwordFieldType]} placeholder='Password' className='text-field' name='password' onChange={handleFieldChange} autoComplete='off'/>
                <span className="material-symbols-rounded form-field-icon">password</span>
                <span className="material-symbols-rounded show-password-icon" onClick={handleShowPassword}>{passwordFieldVisibilityIcon}</span>
                <p className='form-field-error'>{formFieldsErrors.password}</p>
                <ul style={{position: "absolute", left: "2px", color: "#7963c0", bottom: `${formFieldsErrors.password != "" ? '-120px' : '-105px'}`}}>
                    <li className='password-rule'>{passwordHasErrors["rule1"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 8 characters long</li>
                    <li className='password-rule'>{passwordHasErrors["rule2"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 uppercase letter</li>
                    <li className='password-rule'>{passwordHasErrors["rule3"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 digit</li>
                    <li className='password-rule'>{passwordHasErrors["rule4"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 special character</li>
                </ul>
            </div>





            <button style={{marginTop: "100px"}} className='form-btn' onClick={handleSignUpRequest}>Sign Up</button>
            
            {
                registerRequestError != "" ?
                <p style={{color: "red"}}>{registerRequestError}</p> :
                null
            }

<div className='form-link' style={{textAlign: "center"}}>
                Already have an account?&nbsp;
                <Link to={"/biteandsip/login"}>
                    <span>Sign In</span>
                </Link>
            </div>

            
        </form>
    </div>
}

export default Register;