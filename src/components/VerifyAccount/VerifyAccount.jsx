import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants/Constants";

const VerifyAccount = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`${BACKEND_URL}/api/v1/app/public/verify-account`, {"token": params.token})
        .then((res) => {
            navigate("/biteandsip/login", {
                state: { message: res.data.message },
              });
          })
          .catch((err) => {
            navigate("/biteandsip/login", {
                state: { message: err.response.data.message },
              });
          });
    }, [])
}

export default VerifyAccount;