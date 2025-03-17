import { useEffect } from 'react';
import './MenuCategories.css'

const MenuCategories = () => {
    useEffect(() => {

    }, [])

    const categories = [
        {id: 1, name: "Salad", img: "https://img.freepik.com/free-photo/vegetables-salad-table_23-2148515515.jpg"},
        {id: 2, name: "Grill", img: "https://st2.depositphotos.com/1194063/7135/i/450/depositphotos_71351499-stock-photo-grill.jpg"},
        {id: 3, name: "Beef", img: "https://img.freepik.com/free-photo/vegetables-salad-table_23-2148515515.jpg"}
    ]

    return <div className='categories-container'>
        <h3>Explore by Food Category</h3>
        <div className='menu-categories'>
        {
            categories.map(item => {
                return <div className='item-container'>
                    <img src={item.img} alt={item.name} style={{width: "100px", height: "100px"}}/>
                    <p>{item.name}</p>
                </div>
            })
        }
        </div>
        <hr />
    </div>
}

export default MenuCategories;