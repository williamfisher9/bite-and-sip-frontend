import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import TableDisplay from "./TableDisplay";

const FoodCategories = () => {
    const navigate = useNavigate();
    const [foodCategories, setFoodCategories] = useState([]);

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })

        axios.get("http://localhost:8080/api/v1/app/admin/food-categories", {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
        .then(res => {
            if(res.status==200){
                setFoodCategories(res.data.message);
            }
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate("/biteandsip/login");
            }
        })

        return window.removeEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    const handleSearchBarChange = () => {
        axios.post(`http://localhost:8080/api/v1/app/admin/food-categories/search`, {val: event.target.value == "" ? "-" : event.target.value}, 
            {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}}
        )
        .then((res) => {
            if(res.status==200){
                setFoodCategories(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const addNewFoodCategory = () => {
        navigate(`/biteandsip/admin/food-categories/new`);
    }

    return <div className="main-container">

        <div className="main-actions-container">
            <div className="search-field-container">
            <input
                type="text"
                placeholder="Search Categories"
                id="searchBarVal"
                name="searchBarVal"
                className="search-input"
                onChange={handleSearchBarChange}
            />
            </div>

            <button onClick={addNewFoodCategory} className="add-action-container">
                <span className="material-symbols-rounded" >add</span>
            </button>

        </div>
        
        {
            windowSize < 800 ?
            <CardDisplay foodCategories={foodCategories} />
            :
            <TableDisplay foodCategories={foodCategories} />
        }       
    
</div>
}

export default FoodCategories;