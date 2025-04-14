import { useContext, useEffect } from 'react'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import './Settings.css'
import { GlobalStateContext } from '../../../context/GlobalState';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/Constants';
import Cookies from 'js-cookie';

const Settings = () => {
    const {setActiveNavbarItem} = useContext(GlobalStateContext);
    
    useEffect(() => {
        setActiveNavbarItem("SETTINGS")

        axios.get(`${BACKEND_URL}/api/v1/app/admin/settings`, {headers: {Authorization: `Bearer ${Cookies.get('token')}`}})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])
    return <div className="settings-outer-container">
        <Breadcrumbs />
    </div>
}

export default Settings