import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import './Layout.css'

const Layout = () => {
    return <div className="layout-wrapper">
        <div className="layout-container">
            <Header />
            <Outlet />
        </div>
    </div>
}

export default Layout;