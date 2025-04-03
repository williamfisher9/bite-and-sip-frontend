
import { useNavigate } from 'react-router-dom';
import './FoodCategories.css'

const CardDisplay = ({foodCategories}) => {
    const navigate = useNavigate()

    const editFoodCategory = (item) => {
        navigate(`/biteandsip/admin/food-categories/${item.id}`);
    }

    return <div className='food-categories-cards-grid'>
    {
        foodCategories.map((item) => {
            return <div className='food-category-card-item' key={item.id}>
                <div className='card-item-image-container'>
                    <img src={item.imageSource} alt={item.name} />
                    <div className='card-actions'>
                        <span style={{ backgroundColor: item.active ? "green" : "red", padding: "5px 8px", borderRadius: "5px", fontSize: "12px", color: "#fff"}}>{item.active ? "ACTIVE" : "INACTIVE"}</span>
                        <span className="material-symbols-rounded card-action-icon" onClick={() => editFoodCategory(item)}>edit</span>
                        
                    </div>   
                    <span className='food-category-text'>{item.name}</span>               
                </div>               
            </div>
        })
    }
    </div>
}

export default CardDisplay