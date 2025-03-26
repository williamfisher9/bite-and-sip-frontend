import { useContext } from 'react';
import './FoodCategory.css'
import { useLocation, useNavigate } from 'react-router-dom';

import allFoodsImg from '../../../assets/allfoods.jpg'
import { GlobalStateContext } from '../../../context/GlobalState';

const FoodCategory = ({foodCategories}) => {
    const navigate = useNavigate()
    const {globalState, setActiveCategory} = useContext(GlobalStateContext)
    const location = useLocation()
    
    return <div className='categories-container'>
        <h3 style={{fontWeight: "600", backgroundColor: "#7963c0", width: "100%", color: "#fff", height: "50px", display: "flex", justifyContent: "center", alignItems: "center"}}>Explore by Food Category</h3> 
        <div className='categories-grid'>
        <div key="ALL" className='item-container' 
        onClick={() => { setActiveCategory("ALL"); navigate(`/biteandsip/${location.pathname.startsWith('/biteandsip/home') ? 'home' : 'menu'}`) }}>
                    <img src={allFoodsImg} alt="all foods image" style={{width: "100px", height: "100px"}} 
                    className={globalState.activeCategory == "ALL" ? 'active-category' : ''}/>
                    <p>All Foods</p>
                </div>
        {
            foodCategories.map(item => {
                return <div key={item.id} className='item-container' onClick={() => { setActiveCategory(item.name); 
                navigate(`/biteandsip/${location.pathname.startsWith('/biteandsip/home') ? 'home' : 'menu'}/category/${item.id}`) }}>
                    <img src={item.imageSource} alt={item.name} style={{width: "100px", height: "100px"}} className={globalState.activeCategory == item.name ? 'active-category' : ''}/>
                    <p>{item.name}</p>
                </div>
            })
        }
        </div>
    </div>
}

export default FoodCategory;