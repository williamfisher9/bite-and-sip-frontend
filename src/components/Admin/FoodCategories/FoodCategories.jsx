import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import FoodCategoriesCardDisplay from "./FoodCategoriesCardDisplay";
import FoodCategoriesTableDisplay from "./FoodCategoriesTableDisplay";

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

    return <div className="admin-food-categories-container">

        <div className="main-bar-container">
        <div style={{position: "relative", height: "60px", width: "80%", border: "2px solid #7963c0", borderRadius: "10px"}}>
          <input
            type="text"
            placeholder="Search Categories"
            id="searchBarVal"
            name="searchBarVal"
            style={{position: "absolute", height: "100%", width: "100%", top: "0", left: "0", paddingLeft: "10px", fontSize: "18px", border: "none", outline: "none", backgroundColor: "transparent"}}
            className="absolute top-0 left-0 w-full
             h-full pl-2 bg-transparent border-none outline-none rounded-md"
            onChange={handleSearchBarChange}
          />
        </div>

        <button onClick={addNewFoodCategory} style={{width: "60px", height: "60px", borderRadius: "10px", border: "2px solid #7963c0", cursor: "pointer"}}>
            <span className="material-symbols-rounded" >add</span>
        </button>

        </div>
        
        {
            windowSize < 800 ?
            <FoodCategoriesCardDisplay foodCategories={foodCategories} />
            :
            <FoodCategoriesTableDisplay foodCategories={foodCategories} />
        }       
    
</div>
}

export default FoodCategories;