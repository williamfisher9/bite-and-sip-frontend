import { FaChevronRight } from "react-icons/fa"
import { useLocation } from "react-router-dom"
import './Breadcrumbs.css'
import { useContext } from "react"
import { GlobalStateContext } from "../../../context/GlobalState"

const Breadcrumbs = () => {
    const { globalState } = useContext(GlobalStateContext);

    const location = useLocation()
    return <div className="breadcrumbs-container">
        ADMINISTRATION <FaChevronRight /> <span style={{fontWeight: "600", textDecoration: "underline"}}>{globalState.activeNavbarItem}</span>
    </div>
}

export default Breadcrumbs