import { FaChevronRight } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import './Breadcrumbs.css'
import { useContext } from "react"
import { GlobalStateContext } from "../../../context/GlobalState"

const Breadcrumbs = () => {
    const { globalState } = useContext(GlobalStateContext);

    const location = useLocation()
    return <div className="breadcrumbs-container">
        <Link to="/biteandsip/admin/dashboard">ADMINISTRATION</Link> 
        <FaChevronRight /> 
        <span style={{fontWeight: "600"}}>{globalState.activeNavbarItem}</span>
    </div>
}

export default Breadcrumbs