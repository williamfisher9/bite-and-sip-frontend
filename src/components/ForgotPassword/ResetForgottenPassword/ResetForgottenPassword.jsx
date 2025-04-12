import { Link, useNavigate, useParams } from "react-router-dom";
import "./ResetForgottenPassword.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logoImg from "../../../assets/logo.png";
import { BACKEND_URL } from "../../../constants/Constants.jsx";
import FormButton from "../../FormButton/FormButton.jsx";

const ResetForgottenPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formFields, setFormFields] = useState({ password: "" });
  const [formFieldsErrors, setFormFieldsErrors] = useState({ password: "" });

  const [forgotPasswordRequestError, setForgotPasswordRequestError] = useState("");

  const [passwordFieldType, setPasswordFieldType] = useState("password")
  const [passwordFieldVisibilityIcon, setPasswordFieldVisibilityIcon] = useState("visibility");

  const [passwordHasErrors, setPasswordHasErrors] = useState({rule1: true, rule2: true, rule3: true, rule4: true})

  const [loading, setLoading] = useState(false);

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

  const handleForgotPasswordRequest = () => {
    event.preventDefault();

    let hasErrors = false;
    let newErrors = {};

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

    if (!hasErrors) {
      setLoading(true)
      axios
        .post(`${BACKEND_URL}/api/v1/app/public/reset-password`, {
          password: formFields.password,
          token: params.token
        })
        .then((res) => {
          setLoading(false)
          if (res.status == 200) {
            setForgotPasswordRequestError("");
            navigate("/biteandsip/login", {
              state: { message: res.data.message },
            });
          }
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          setForgotPasswordRequestError(err.response.data.message);
        });
    }
  };

  return (
    <div className="outer-container">
      <form className="form-container">
        <img
          src={logoImg}
          alt="logo"
          style={{ height: "50px", margin: "20px 0" }}
        />

<div className='inner-form-container'>

        <div className='form-field-group'>
                <input type={[passwordFieldType]} placeholder='Password' className='text-field' name='password' onChange={handleFieldChange} autoComplete='off'/>
                <span className="material-symbols-rounded form-field-icon">password</span>
                <span className="material-symbols-rounded show-password-icon" onClick={handleShowPassword}>{passwordFieldVisibilityIcon}</span>
                <p className='form-field-error'>{formFieldsErrors.password}</p>
                <ul style={{position: "absolute", left: "2px", color: "var(--main-color)", bottom: `${formFieldsErrors.password != "" ? '-120px' : '-105px'}`}}>
                    <li className='password-rule'>{passwordHasErrors["rule1"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 8 characters long</li>
                    <li className='password-rule'>{passwordHasErrors["rule2"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 uppercase letter</li>
                    <li className='password-rule'>{passwordHasErrors["rule3"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 digit</li>
                    <li className='password-rule'>{passwordHasErrors["rule4"] == false ? <span className="material-symbols-rounded text-green">check_circle</span> : <span className="material-symbols-rounded text-red">cancel</span>}At least 1 special character</li>
                </ul>
            </div>

            <FormButton handleRequest={handleForgotPasswordRequest} isLoading={loading} customStyles={{marginTop: "100px"}}>
                <span>Reset Password</span>
            </FormButton>

        {forgotPasswordRequestError != "" ? (
          <p style={{ color: "red" }}>{forgotPasswordRequestError}</p>
        ) : null}

        <div className="form-link" style={{ textAlign: "center" }}>
          Move back to login page?&nbsp;
          <Link to={"/biteandsip/login"}>
            <span>Sign In</span>
          </Link>
        </div>

        </div>
      </form>
    </div>
  );
};

export default ResetForgottenPassword;
