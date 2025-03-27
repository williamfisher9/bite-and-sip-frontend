import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import './Coupons.css'

const CouponsEditor = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    code: "",
    amount: "",
    fromDate: "",
    toDate: "",
    active: false
  });

  const [formFieldsErrors, setFormFieldsErrors] = useState({
    codeError: "",
    amountError: "",
    fromDateError: "",
    toDateError: "",
  });

  const [requestError, setRequestError] = useState("")

  useEffect(() => {
    if (params.itemId != "new") {
      axios
        .get(
          `http://localhost:8080/api/v1/app/admin/coupons/${params.itemId}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            setFormFields({
              ...formFields,
              code: res.data.message.code,
              amount: res.data.message.amount,
              fromDate: res.data.message.fromDate,
              toDate: res.data.message.toDate,
              active: res.data.message.active
            });
          }
        })
        .catch((err) => {
          if (err.status == 401 || err.status == 403) {
            navigate("/biteandsip/login");
          }
        });
    }
  }, []);

  const handleFieldChange = () => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const saveCoupon = () => {
    let hasErrors = false;
    let formErrors = {};

    setFormFieldsErrors(formErrors);

    if (formFields.code.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, codeError: "Code should not be null" };
    }

    if (formFields.amount == "") {
      hasErrors = true;
      formErrors = { ...formErrors, amountError: "Amount should not be null" };
    }

    if (formFields.fromDate.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, fromDateError: "From date should not be null" };
    }

    if (formFields.toDate.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, toDateError: "To date should not be null" };
    }

    if (hasErrors) {
      setFormFieldsErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      navigate("/biteandsip/login");
    } else {
      

      if (params.itemId == "new") {
        axios
          .post(
            `http://localhost:8080/api/v1/app/admin/coupons/new`,
            {
              code: formFields.code, 
              amount: formFields.amount, 
              fromDate: formFields.fromDate, 
              toDate: formFields.toDate, 
              active: formFields.active
            },
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              navigate("/biteandsip/admin/coupons");
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              navigate("/biteandsip/login");
            }

            if(err.status == 400){
              setRequestError(err.response.data.message)
            }
          });
      } else {
        const obj = {
          code: formFields.code,
          amount: formFields.amount,
          fromDate: formFields.fromDate, 
          toDate: formFields.toDate, 
          active: formFields.active
        }

        axios
          .put(`http://localhost:8080/api/v1/app/admin/coupons/update/${params.itemId}`, 
            obj, 
            {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
          .then((res) => {
            if (res.status == 200) {
              navigate("/biteandsip/admin/coupons");
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              console.log(err);
            }

            if(err.status == 400){
              console.log(err)
              setRequestError(err.message)
            }
          });
      }
    }
  };

  return (
    <div className="editor-container">
      <div className="inner-editor-container">
        <div className="form-fld-grp">
          <input
            type="text"
            placeholder="Code"
            className="form-fld-input"
            name="code"
            defaultValue={formFields.code}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            Code
          </span>
          <p className="form-fld-error">{formFieldsErrors.codeError}</p>
        </div>

        <div className="form-fld-grp">
          <input
            type="text"
            placeholder="Coupon Amount"
            className="form-fld-input"
            name="amount"
            defaultValue={formFields.amount}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            Amount
          </span>
          <p className="form-fld-error">{formFieldsErrors.amountError}</p>
        </div>

        <div className="form-fld-grp">
          <input
            type="date"
            placeholder="Coupon From Date"
            className="form-fld-input"
            id="fromDate"
            name="fromDate"
            defaultValue={formFields.fromDate}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            From Date
          </span>
          <p className="form-fld-error">{formFieldsErrors.fromDateError}</p>
        </div>

        <div className="form-fld-grp">
          <input
            type="date"
            placeholder="Coupon To Date"
            className="form-fld-input"
            id="toDate"
            name="toDate"
            defaultValue={formFields.toDate}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            To Date
          </span>
          <p className="form-fld-error">{formFieldsErrors.toDateError}</p>
        </div>

        <div className="item-status-wrapper">
          <div className="item-status-toggler">
            {formFields.active ? (
              <div className="active-item-status" 
              onClick={() => {setFormFields({...formFields, active: !formFields.active})}}>ON</div>
            ) : (
              <div className="inactive-item-status" 
              onClick={() => {setFormFields({...formFields, active:  !formFields.active})}}>OFF</div>
            )}
          </div>
        </div>

        <div className="editor-actions-container">
          <button className="editor-action" onClick={saveCoupon}>
            SAVE <span className="material-symbols-rounded">publish</span>
          </button>

          <button
            className="editor-action"
            onClick={() => {
              navigate("/biteandsip/admin/coupons");
            }}
          >
            CANCEL <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <p style={{color: "red"}}>{requestError}</p>
      </div>
    </div>
  );
};

export default CouponsEditor;
