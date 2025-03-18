import { useContext, useEffect } from 'react';
import './FoodCategory.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../context/GlobalState';

const FoodCategory = ({showMessage}) => {
    const navigate = useNavigate()
    const {globalState, setActiveCategory} = useContext(GlobalStateContext)

    const location = useLocation()

    const categories = [
        {id: 0, name: "All Foods", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/all`, img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"},
        {id: 1, name: "Appetizers", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/appetizers`, img: "https://www.tasteofhome.com/wp-content/uploads/2018/01/EXPS_13X9BKZ_172743_B04_27_1b-1.jpg"},
        {id: 2, name: "Pizza", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/pizza`, img: "https://www.seriouseats.com/thmb/xiXNRtRcipa1zSjmKO4iGdM0b24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2017__04__20170411-pizza-oven-testing-roccbox-best-c7f2acbecbb047c0b3b74e1835a77f03.jpg"},
        {id: 3, name: "Burgers", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/burgers`, img: "https://www.realsimple.com/thmb/z3cQCYXTyDQS9ddsqqlTVE8fnpc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg"},
        {id: 4, name: "Fish", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/fish`, img: "https://static01.nyt.com/images/2021/09/20/dining/nd-mahi/nd-mahi-threeByTwoMediumAt2X.jpg"},
        {id: 5, name: "Grill", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/grill`, img: "https://www.shutterstock.com/image-photo/grilled-beef-kebabs-served-fresh-600nw-2462238555.jpg"},
        {id: 6, name: "Pasta", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/pasta`, img: "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2021/10/roasted-tomato-sauce-portion-800x1200.jpg"},
        {id: 12, name: "Drinks", url: `/goodies/${location.pathname.startsWith("/goodies/home") ? 'home' : 'menu'}/categories/drinks`, img: "https://t4.ftcdn.net/jpg/01/07/93/25/360_F_107932517_bRTDt5PCP4mOxlnsifzR6kXxkR3xi8QA.jpg"}
    ]

    return <div className='categories-container'>
        {showMessage ?
        <h3>Explore by Food Category</h3> 
    : null}
        <div className='categories-grid'>
        {
            categories.map(item => {
                return <div key={item.id} className='item-container' onClick={() => {navigate(`${item.url}`); setActiveCategory(item.name) }}>
                    <img src={item.img} alt={item.name} style={{width: "100px", height: "100px"}} className={globalState.activeCategory == item.name ? 'active-category' : ''}/>
                    <p>{item.name}</p>
                </div>
            })
        }
        </div>
        <hr style={{width: "100%", marginBottom: "20px", height: "3px", backgroundColor: "#7963c0"}}/>
    </div>
}

export default FoodCategory;