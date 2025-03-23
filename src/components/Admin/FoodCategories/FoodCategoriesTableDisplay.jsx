import { useNavigate } from 'react-router-dom';
import './FoodCategories.css'

const FoodCategoriesTableDisplay = ({foodCategories}) => {
    const navigate = useNavigate()

    const editFoodCategory = (item) => {
        navigate(`/biteandsip/admin/food-categories/${item.id}`);
    }

    return <table>
    <thead>
        <tr>
            <th>Item</th>
            <th>Name</th>
            <th style={{textAlign: "center"}}>Edit</th>
            </tr>
            </thead>
            <tbody>
        {
            foodCategories.map((item) => {
                return <tr key={item.id}>
                    <td><img src={item.imageSource} alt={item.name} className="item-img" /></td>
                    <td>{item.name}</td>
                    <td style={{textAlign: "center"}}>
                    <span className="material-symbols-rounded action-icon" onClick={() => editFoodCategory(item)}>edit</span>

                    </td>
                </tr>
            })
        }
</tbody>
    </table>
}

export default FoodCategoriesTableDisplay