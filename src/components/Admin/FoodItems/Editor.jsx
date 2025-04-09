import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";

import { BACKEND_URL } from "../../../constants/Constants";

import './FoodItems.css'
import { MenuContext } from "../../../context/Menu";
import { GlobalStateContext } from "../../../context/GlobalState";
import ItemStatus from "../../ItemStatus/ItemStatus";
import FormButton from "../../FormButton/FormButton";

const FoodItemEditor = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
      const {clearMenuItemsState} = useContext(MenuContext)

      const [loading, setLoading] = useState(false)

  const [formFields, setFormFields] = useState({
    name: "",
    imageFile: null,
    imageUrl: "",
    active: false, 
    price: "",
    description: "",
    categoryId: 0,
    categories: []
  });

  const [formFieldsErrors, setFormFieldsErrors] = useState({
    nameError: "",
    imageError: "",
    priceError: "",
    descriptionError: "",
    categoryIdError: ""
  });

  const mainImageRef = useRef();

  useEffect(() => {
    setActiveNavbarItem("FOOD ITEM")
    if (params.itemId != "new") {
      axios
        .get(
          `${BACKEND_URL}/api/v1/app/admin/food-items/${params.itemId}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            setFormFields({
              ...formFields,
              name: res.data.message.foodItem.name,
              imageUrl: res.data.message.foodItem.imageSource,
              active: res.data.message.foodItem.active,
              description: res.data.message.foodItem.description,
              price: res.data.message.foodItem.price,
              categoryId: res.data.message.foodItem.category.id,
              categories: res.data.message.categories
            });
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.status == 401 || err.status == 403) {
            clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
          }
        });
    } else {
      axios
        .get(
          `${BACKEND_URL}/api/v1/app/admin/food-categories`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          
          if (res.status == 200) {
            setFormFields({
              ...formFields,
              categories: res.data.message
            });
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.status == 401 || err.status == 403) {
            clearUserCookie();
          clearMenuItemsState();
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

  const saveFoodItem = () => {
    let hasErrors = false;
    let formErrors = { nameError: "", descriptionError: "", priceError: "", categoryError: "", imageFile: ""  };

    if (formFields.name.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, nameError: "Name should not be null" };
    }

    if (formFields.description.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, descriptionError: "Description should not be null" };
    }

    if (parseFloat(formFields.pirce) <= 0 || formFields.price == null || formFields.price == "") {
      hasErrors = true;
      formErrors = { ...formErrors, priceError: "invalid price" };
    }

    if (formFields.categoryId == 0) {
      hasErrors = true;
      formErrors = { ...formErrors, categoryIdError: "Category should not be null" };
    }

    if (formFields.imageFile == null && formFields.imageUrl == "") {
      hasErrors = true;
      formErrors = { ...formErrors, imageError: "Select an image" };
    }

    if (hasErrors) {
      setFormFieldsErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
    } else {
      
      setLoading(true)
      if (params.itemId == "new") {
        let formData = new FormData();
        formData.append("name", formFields.name);
        formData.append("price", formFields.price);
        formData.append("description", formFields.description);
        formData.append("active", formFields.active);
        formData.append("file", formFields.imageFile);
        formData.append("categoryId", formFields.categoryId);

        axios
          .post(
            `${BACKEND_URL}/api/v1/app/admin/food-items/new`,
            formData,
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
          )
          .then((res) => {
            setLoading(false)
            if (res.status == 201) {
              navigate("/biteandsip/admin/food-items");
            }
          })
          .catch((err) => {
            setLoading(false)
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
            }
          });
      } else {
        let formData = new FormData();
        formData.append("name", formFields.name);
        formData.append("price", formFields.price);
        formData.append("description", formFields.description);
        formData.append("active", formFields.active);
        formData.append("file", formFields.imageFile);
        formData.append("categoryId", formFields.categoryId);

        axios
          .put(
            `${BACKEND_URL}/api/v1/app/admin/food-items/update/${params.itemId}`, formData, { headers: { "Authorization": `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            setLoading(false)
            if (res.status == 200) {
              navigate("/biteandsip/admin/food-items");
            }
          })
          .catch((err) => {
            setLoading(false)
            if (err.status == 401 || err.status == 403) {
              console.log(err);
            }
          });
      }
    }
  };

  const handleSelectChange = () => {
    setFormFields({...formFields, categoryId: event.target.value})
  }

  const toggleStatus = () => {
    setFormFields({...formFields, active: !formFields.active})
  }


  return (
    <div className="editor-container">
      <div className="inner-editor-container">
        <div className="form-fld-grp">
          <input
            type="text"
            placeholder="Food Item Name"
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











        <div className="form-fld-grp">
          <input
            type="text"
            placeholder="Food Item Description"
            className="form-fld-input"
            name="description"
            defaultValue={formFields.description}
            onChange={handleFieldChange}
            multi="true"
          />
          <span className="form-fld-icon">
            Description
          </span>
          <p className="form-fld-error">{formFieldsErrors.descriptionError}</p>
        </div>


        <div className="form-fld-grp">
          <input
            type="text"
            placeholder="Price"
            className="form-fld-input"
            name="price"
            defaultValue={formFields.price}
            onChange={handleFieldChange}
          />
          <span className="form-fld-icon">
            Price
          </span>
          <p className="form-fld-error">{formFieldsErrors.priceError}</p>
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
                    Menu Item Image
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








        <div className="category-type-select">
       
        <select onChange={handleSelectChange} id="selectedCategory" name="selectedCategory" value={formFields.categoryId}>
          <option key="None" value="0">Choose a Category</option>
          {
            formFields.categories.map((item) => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })
          }

        </select>

        <p className="form-fld-error">{formFieldsErrors.categoryIdError}</p>
      </div>












      <ItemStatus active={formFields.active} toggleStatus={toggleStatus} />


      <div className="editor-actions-container">
          <FormButton handleRequest={saveFoodItem} isLoading={loading}>
            <div className="editor-action">
              <span>SAVE</span><span className="material-symbols-rounded">publish</span>
            </div>
          </FormButton>

          <FormButton handleRequest={() => navigate("/biteandsip/admin/food-items")}>
            <div className="editor-action">
              <span>CANCEL</span><span className="material-symbols-rounded">close</span>
            </div>
          </FormButton>

        </div>

      </div>
    </div>
  );
};

export default FoodItemEditor;
