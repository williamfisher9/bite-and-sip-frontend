import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Employees.css";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/Constants";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { GlobalStateContext } from "../../../context/GlobalState";
import { MenuContext } from "../../../context/Menu";

const EmployeeEditor = () => {
  const navigate = useNavigate();

  const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
      const {clearMenuItemsState} = useContext(MenuContext)
  const [formFields, setFormFields] = useState({
    username: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    roles: [],
  });

  const [formFieldsErrors, setFormFieldsErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    roleId: "",
  });

  const [registerRequestError, setRegisterRequestError] = useState("");

  const { state } = useLocation();

  const handleSelectChange = () => {
    setFormFields({ ...formFields, roleId: event.target.value });
  };

  const params = useParams();

  useEffect(() => {
    if (params.itemId == "new") {
      axios
        .get(`${BACKEND_URL}/api/v1/app/admin/roles`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          
        });
    } else {
      axios
        .get(`${BACKEND_URL}/api/v1/app/admin/employees/${params.itemId}`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          console.log(res.data.message);
          setFormFields(res.data.message);
        });
    }
  }, []);

  const handleFieldChange = () => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const saveEmployeeAccount = (e) => {
    e.preventDefault();
    let hasErrors = false;
    let newErrors = {};

    if (formFields.username.trim() == "") {
      newErrors["username"] = "Username is required";
      hasErrors = true;
    }

    if (formFields.firstName.trim() == "") {
      newErrors["firstName"] = "First name field is required";
      hasErrors = true;
    }

    if (formFields.lastName.trim() == "") {
      newErrors["lastName"] = "Last name field is required";
      hasErrors = true;
    }

    if (formFields.roleId == 0) {
      newErrors["roleId"] = "Select the new employee role";
      hasErrors = true;
    }

    setFormFieldsErrors(newErrors);

    if (!hasErrors) {
      if(params.itemId == "new"){
        axios
        .post(
          `${BACKEND_URL}/api/v1/app/admin/employees/new`,
          {
            username: formFields.username,
            firstName: formFields.firstName,
            lastName: formFields.lastName,
            password: uuidv4(),
            userType: formFields.roleId,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 201) {
            setRegisterRequestError("");
            navigate("/biteandsip/admin/employees");
          }
        })
        .catch((err) => {
            if(err.status == 401 || err.status == 403){
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
            }
          setRegisterRequestError(err.response.data.message);
        });
      } else {
        axios.put(`${BACKEND_URL}/api/v1/app/admin/employees/update/${params.itemId}`,
          {
            username: formFields.username,
            firstName: formFields.firstName,
            lastName: formFields.lastName,
            roleId: formFields.roleId,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            setRegisterRequestError("");
            navigate("/biteandsip/admin/employees");
          }
        })
        .catch((err) => {
            if(err.status == 401 || err.status == 403){
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
            }
          setRegisterRequestError(err.response.data.message);
        });
      }
    }
  };

  return (
    <div className="outer-employee-editor-container">
      <div className="inner-employee-editor-container">
        {state?.message && (
          <p className="form-message-employee-editor">{state?.message}</p>
        )}

        <div className="form-field-group-employee-editor">
          <input
            type="text"
            placeholder="Email Address"
            className="text-field"
            name="username"
            onChange={handleFieldChange}
            defaultValue={formFields.username}
          />
          <span className="material-symbols-rounded form-field-icon-employee-editor">
            person
          </span>
          <p className="form-field-error-employee-editor">
            {formFieldsErrors.username}
          </p>
        </div>

        <div className="form-field-group-employee-editor">
          <input
            type="text"
            placeholder="First Name"
            className="text-field"
            name="firstName"
            onChange={handleFieldChange}
            defaultValue={formFields.firstName}
          />
          <span className="material-symbols-rounded form-field-icon-employee-editor">
            id_card
          </span>
          <p className="form-field-error-employee-editor">
            {formFieldsErrors.firstName}
          </p>
        </div>

        <div className="form-field-group-employee-editor">
          <input
            type="text"
            placeholder="Last Name"
            className="text-field"
            name="lastName"
            onChange={handleFieldChange}
            defaultValue={formFields.lastName}
          />
          <span className="material-symbols-rounded form-field-icon-employee-editor">
            id_card
          </span>
          <p className="form-field-error-employee-editor">
            {formFieldsErrors.lastName}
          </p>
        </div>

        <div className="category-type-select-employee-editor">
          <select
            onChange={handleSelectChange}
            id="selectedCategory"
            name="selectedCategory"
          >
            <option key="None" value="0">
              Choose Employee ROLE
            </option>
            {formFields.roles.map((item) => {
              return (
                <option key={item.id} value={item.id} selected={formFields.roleId == item.id}>
                  {item.authority}
                </option>
              );
            })}
          </select>

          <p className="form-fld-error-employee-editor">
            {formFieldsErrors.roleId}
          </p>
        </div>

        <button
          className="form-btn-employee-editor"
          onClick={saveEmployeeAccount}
        >
          Save Account
        </button>

        <button
          className="form-btn-employee-editor"
          onClick={() => navigate("/biteandsip/admin/employees")}
        >
          Cancel
        </button>

        {registerRequestError != "" ? (
          <p style={{ color: "red" }}>{registerRequestError}</p>
        ) : null}
      </div>
    </div>
  );
};

export default EmployeeEditor;
