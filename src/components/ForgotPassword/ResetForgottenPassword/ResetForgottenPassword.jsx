import { Link, useNavigate } from "react-router-dom";
import "./ResetForgottenPassword.css";
import { useState } from "react";
import axios from "axios";
import logoImg from "../../../assets/logo.png";
import { BACKEND_URL } from "../../../constants/Constants.jsx";

const ResetForgottenPassword = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ emailAddress: "" });
  const [formFieldsErrors, setFormFieldsErrors] = useState({
    emailAddress: "",
  });
  const [forgotPasswordRequestError, setForgotPasswordRequestError] =
    useState("");

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
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleForgotPasswordRequest = () => {
    event.preventDefault();

    let hasErrors = false;
    let newErrors = {};

    if (formFields.emailAddress.trim() == "") {
      newErrors["emailAddress"] = "Email address is required";
      hasErrors = true;
    }

    setFormFieldsErrors(newErrors);

    if (!hasErrors) {
      axios
        .post(`${BACKEND_URL}/api/v1/app/public/forgot-password`, {
          username: formFields.emailAddress,
        })
        .then((res) => {
          if (res.status == 200) {
            setForgotPasswordRequestError("");
            navigate("/biteandsip/login", {
              state: { message: res.data.contents },
            });
          }
        })
        .catch((err) => {
          setForgotPasswordRequestError(err.response.data.contents);
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
        <div className="form-field-group">
          <input
            type="text"
            placeholder="Email Address"
            className="text-field"
            name="emailAddress"
            disabled
            onChange={handleFieldChange}
          />
          <span className="material-symbols-rounded form-field-icon">
            person
          </span>
          <p className="form-field-error">{formFieldsErrors.emailAddress}</p>
        </div>

        <div className="form-field-group">
          <input
            type={passwordFieldType}
            placeholder="Password"
            className="text-field"
            name="password"
            onChange={handleFieldChange}
          />
          <span className="material-symbols-rounded form-field-icon">password</span>
          <span className="material-symbols-rounded show-password-icon" onClick={handleShowPassword}>{passwordFieldVisibilityIcon}</span>
          <p className="form-field-error">{formFieldsErrors.password}</p>
        </div>

        <button className="form-btn" onClick={handleForgotPasswordRequest}>
          Reset Password
        </button>

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
