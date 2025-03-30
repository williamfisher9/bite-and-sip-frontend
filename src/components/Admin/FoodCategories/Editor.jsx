import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";

import { BACKEND_URL } from "../../../constants/Constants";

const FoodCategoryEditor = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    imageFile: null,
    imageUrl: "",
    active: false
  });

  const [formFieldsErrors, setFormFieldsErrors] = useState({
    nameError: "",
    imageError: "",
  });

  const mainImageRef = useRef();

  useEffect(() => {
    if (params.itemId != "new") {
      axios
        .get(
          `${BACKEND_URL}/api/v1/app/admin/food-categories/${params.itemId}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            //setItem(res.data.message)
            setFormFields({
              ...formFields,
              name: res.data.message.name,
              imageUrl: res.data.message.imageSource,
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
    if (event.target.name == "imageFile") {
      setFormFields({
        ...formFields,
        imageFile: event.target.files[0],
        imageUrl: window.URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setFormFields({ ...formFields, [event.target.name]: event.target.value });
    }
  };

  const saveCategory = () => {
    let hasErrors = false;
    let formErrors = { nameError: "" };

    if (formFields.name.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, nameError: "Name should not be null" };
    }

    if (formFields.imageFile == null && formFields.imageUrl == "") {
      hasErrors = true;
      formErrors = { ...formErrors, imageError: "Select an image" };
    }

    if (hasErrors) {
      setFormFieldsErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      navigate("/biteandsip/login");
    } else {
      

      if (params.itemId == "new") {
        let formData = new FormData();
          formData.append("name", formFields.name);
          formData.append("file", formFields.imageFile);
          formData.append("active", formFields.active);

        axios
          .post(
            `${BACKEND_URL}/api/v1/app/admin/food-categories/new`,
            formData,
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              navigate("/biteandsip/admin/food-categories");
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              navigate("/biteandsip/login");
            }
          });
      } else {
        let formData = new FormData();
        formData.append("name", formFields.name);
        formData.append("file", formFields.imageFile);
        formData.append("active", formFields.active);

        axios
          .put(
            `${BACKEND_URL}/api/v1/app/admin/food-categories/update/${params.itemId}`, formData, { headers: { "Authorization": `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 200) {
              navigate("/biteandsip/admin/food-categories");
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              console.log(err);
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
            placeholder="Category Name"
            className="form-fld-input"
            name="name"
            defaultValue={formFields.name}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            Name
          </span>
          <p className="form-fld-error">{formFieldsErrors.nameError}</p>
        </div>

        <div className="editor-item-image-container">
          <div
            className="inner-editor-item-image-container"
            onClick={() => mainImageRef.current.click()}
          >
            {formFields.imageUrl != "" ? (
              <img
                src={formFields.imageUrl}
                className="selected-img-display"
                alt="test"
              />
            ) : (
              <div className="empty-image-selector">
                <div style={{ padding: "5px", borderRadius: "50%" }}>
                  <IoCloudUploadOutline style={{ fontSize: "30px" }} />
                </div>

                <p
                  style={{
                    marginBottom: "2px",
                    color: "black",
                    fontSize: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    Food Category Image
                  </span>
                </p>
              </div>
            )}

            <input
              name="imageFile"
              type="file"
              style={{ display: "none" }}
              ref={mainImageRef}
              onChange={handleFieldChange}
            />
          </div>
          <p className="image-field-error">
            {formFieldsErrors.imageError}
          </p>
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
          <button className="editor-action" onClick={saveCategory}>
            SAVE <span className="material-symbols-rounded">publish</span>
          </button>

          <button
            className="editor-action"
            onClick={() => {
              navigate("/biteandsip/admin/food-categories");
            }}
          >
            CANCEL <span className="material-symbols-rounded">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCategoryEditor;
