import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./Settings.css";
import { GlobalStateContext } from "../../../context/GlobalState";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/Constants";
import Cookies from "js-cookie";
import { MenuContext } from "../../../context/Menu";
import { CartContext } from "../../../context/Cart";
import { useNavigate } from "react-router-dom";
import FormButton from "../../FormButton/FormButton";

const Settings = () => {
  const { setActiveNavbarItem } = useContext(GlobalStateContext);
  const [params, setParams] = useState([]);

  const [loading, setLoading] = useState(false);

  const { clearUserCookie } = useContext(GlobalStateContext);
  const { clearMenuItemsState } = useContext(MenuContext);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveNavbarItem("SETTINGS");

    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/app/admin/settings`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        setLoading(false);
        setParams(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        if (err.status == 401 || err.status == 403) {
          clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
        }
      });
  }, []);

  const [param, setParam] = useState({ id: 0, value: null });

  const handleParamChange = (id) => {
    setParam({ id: id, value: event.target.value });
  };

  const saveParamChange = (id) => {
    if (param.id != 0) {
      axios
        .post(
          `${BACKEND_URL}/api/v1/app/admin/settings/update/${id}`,
          { value: param.value },
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            setParam({ id: 0, value: null });
          }
        })
        .catch((err) => {
          if (err.status == 401 || err.status == 403) {
            clearUserCookie();
            clearMenuItemsState();
            navigate("/biteandsip/login");
          }
        });
    }
  };

  const customStyle = {
    position: "absolute",
    top: "50%",
    right: "5px",
    transform: "translateY(-50%)",
    backgroundColor: "var(--main-color)",
    color: "#fff",
    outline: "none",
    border: "none",
    padding: "5px 8px",
    cursor: "pointer",
    borderRadius: "5px",
    width: "50px",
    height: "25px",
    fontSize: "14px",
  };

  return (
    <div className="settings-outer-container">
      <Breadcrumbs />

      <div className="settings-inner-container">
        {params.map((param) => {
          return (
            <div className="param-container" key={param.id}>
              <p className="param-title">{param.paramDesc}</p>
              <div className="param-input-container">
                <input
                  type="text"
                  defaultValue={param.paramValue}
                  className="param-input-field"
                  onChange={() => handleParamChange(param.id)}
                />

                <FormButton
                  handleRequest={() => saveParamChange(param.id)}
                  isLoading={loading}
                  customStyles={customStyle}
                >
                  <span>Save</span>
                </FormButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
