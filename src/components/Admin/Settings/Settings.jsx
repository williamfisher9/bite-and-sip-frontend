import { useContext, useEffect } from 'react'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import './Settings.css'
import { GlobalStateContext } from '../../../context/GlobalState';

const Settings = () => {
    const {setActiveNavbarItem} = useContext(GlobalStateContext);
    useEffect(() => {
        setActiveNavbarItem("SETTINGS")
    }, [])
    return <div className="settings-outer-container">
        <Breadcrumbs />
    </div>
}

export default Settings