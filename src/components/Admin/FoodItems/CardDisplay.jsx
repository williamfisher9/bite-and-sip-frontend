
import { useNavigate } from 'react-router-dom';
import './FoodItems.css'

const CardDisplay = ({foodItems, foodCategories}) => {
    const navigate = useNavigate()

    const editFoodItem = (item) => {
        navigate(`/biteandsip/admin/food-items/${item.id}`);
    }

    return <div className='cards-grid'>
    {
        foodItems.map((item) => {
            return <div className='card-item' key={item.id}>
                <div className='card-item-image-container'>
                    <img src={item.imageSource} alt={item.name} />
                    <div className='card-actions'>
                        <span style={{ backgroundColor: item.active ? "green" : "red", padding: "5px 8px", borderRadius: "5px", fontSize: "12px", color: "#fff"}}>{item.active ? "ACTIVE" : "INACTIVE"}</span>
                        <span className="material-symbols-rounded card-action-icon" onClick={() => editFoodItem(item)}>edit</span>
                    </div>                  
                </div>
                
                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.name}</p>
                </div>      

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "400", fontSize: "14px"}}>{item.description}</p>
                </div>

                <div className='item-price'>
                    <p style={{textAlign: "left", fontWeight: "400", fontSize: "18px", color: "orange"}}>${item.price}</p>
                </div>
  
            </div>
        })
    }
    </div>
}

export default CardDisplay