
import { useNavigate } from 'react-router-dom';
import './FoodCategories.css'

const FoodCategoriesCardDisplay = ({foodCategories}) => {
    const navigate = useNavigate()

    const editFoodCategory = (item) => {
        navigate(`/biteandsip/admin/food-categories/${item.id}`);
    }

    return <div className='admin-food-categories-grid'>
    {
        foodCategories.map((item) => {
            return <div className='admin-food-categories-item' key={item.id}>
                <div className='admin-food-categories-image-container'>
                    <img src={item.imageSource} alt={item.name} />                    
                </div>
                <div className='admin-food-categories-text-container'>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500"}}>{item.name}</p>
                </div>

                <div className='admin-food-categories-actions-container'>
                    <span className="material-symbols-rounded action-icon" onClick={() => editFoodCategory(item)}>edit</span>
                </div>
                
            </div>
        })
    }
    </div>
}

export default FoodCategoriesCardDisplay