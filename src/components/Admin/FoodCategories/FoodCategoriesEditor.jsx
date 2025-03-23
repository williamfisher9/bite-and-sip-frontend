import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";

const FoodCategoriesEditor = () => {
    const [item, setItem] = useState({})
    const [errors, setErrors] = useState({
      nameError: ""
    });
    const params = useParams()
    const navigate = useNavigate()

    const [formFields, setFormFields] = useState({name: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({name: ""})

    const [mainImage, setMainImage] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const mainImageRef = useRef();

    const handleMainImageChange = () => {
        setMainImage(event.target.files[0]);
        setMainImageUrl(window.URL.createObjectURL(event.target.files[0]));
    };

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }

    const saveCategory = () => {
      let hasErrors = false;
      let formErrors = { nameError: ""};

    if (formFields.name.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, titleError: "Name should not be null" };
    }

    if (hasErrors) {
      console.log("test2")
      setErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      
      navigate("/biteandsip/login")
    } else {
      console.log("test")
      let formData = new FormData();
      formData.append("name", formFields.name);
      formData.append("file", mainImage);

      if (params.itemId == "new") {
        axios
          .post(`http://localhost:8080/api/v1/app/admin/food-categories/new`, formData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
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
        axios
          .put(
            `http://localhost:8080/api/v1/app/admin/food-categories/update`,
            formData,
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 201) {
              navigate("/biteandsip/admin/food-categories");
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              console.log(err)
            }
          });
      }
    }
  };




    
    
    useEffect(() => {
        if(params.itemId != "new"){
            axios.get(`http://localhost:8080/api/v1/app/admin/food-categories/${params.itemId}`, 
                {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}}
            )
            .then(res => {
                if(res.status == 200){
                    console.log(res.data.message)
                    setItem(res.data.message)
                }
            })
            .catch((err) => {
                if(err.status == 401 || err.status == 403){
                    navigate("/biteandsip/login")
                }
            })
        }
    }, [])

    return <div className="editor-container">
            
            <div className="inner-editor-container">
            <div className='form-field-group'>
                <input type='text' placeholder='Category Name' className='text-field' name='name' defaultValue={item.name} onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">title</span>
                <p className='form-field-error'>{formFieldsErrors.name}</p>
            </div>







            <div className="food-category-editor-image-container">
                <div
                className="inner-food-category-editor-image-container"
                  
                  onClick={() => mainImageRef.current.click()}
                >
          {mainImageUrl != "" || item != null ? (
            <img
              src={mainImageUrl || item.imageSource}
              className="selected-img-display"
              alt="test"
            />
          ) : (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
              <div
                style={{padding:"5px", borderRadius: "50%"}}
              >
                <IoCloudUploadOutline style={{fontSize: "30px"}} />
              </div>

              <p style={{marginBottom: "2px", color: "black", fontSize: "10px"}}>
                <span style={{fontWeight: "bold"}}>Food Category Image</span>
              </p>
            </div>
          )}

          <input
            type="file"
            style={{display: "none"}}
            ref={mainImageRef}
            onChange={handleMainImageChange}
          />
        </div>
      </div>

          <div className="item-status-wrapper">
            <div className="active-toggle">
              {
                item?.active ? <div className="active-item">ON</div> : <div className="inactive-item">OFF</div>
              }
            </div>
          </div>


            <div className="actions-container">
                <button style={{cursor: "pointer", width: "150px", height: "40px", display: "flex", justifyContent: "center", border: "none", outline: "none", alignItems: "center", gap: "10px", backgroundColor: "#7963c0", color: "white"}}
                    onClick={saveCategory}>
                    SAVE <span className="material-symbols-rounded">publish</span>
                </button>

                <button style={{width: "150px", height: "40px", display: "flex", justifyContent: "center", border: "none", outline: "none", alignItems: "center", gap: "10px", backgroundColor: "#7963c0", color: "white"}}
                    onClick={() => {navigate("/biteandsip/admin/food-categories")}}>
                    CANCEL <span className="material-symbols-rounded">close</span>
                </button>
            </div>

            </div>

    </div>
}

export default FoodCategoriesEditor;