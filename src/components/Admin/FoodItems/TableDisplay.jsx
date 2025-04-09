import { useNavigate } from "react-router-dom";
import './FoodItems.css'
import {  useState } from "react";

const TableDisplay = ({ foodItems, updateFoodItems }) => {
  const navigate = useNavigate();

  const [dragValues, setDragValues] = useState({source: {}, destination: {}});

  const editFoodItem = (item) => {
    navigate(`/biteandsip/admin/food-items/${item.id}`);
  };

  const handleSort = () => {
    //console.log(dragValues.dragged, dragValues.draggedOver)
    updateFoodItems(dragValues.source, dragValues.destination)
    setDragValues({source: {}, destination: {}})
  }

  const handleDragOver = (e, item) => {
    e.preventDefault()
    console.log(item)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>ITEM</th>
          <th>NAME</th>
          <th style={{width: "200px", display: "inline-block"}}>DESC.</th>
          <th>PRICE</th>
          <th>RATING</th>
          <th>CATEGORY</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}></th>
        </tr>
      </thead>
      <tbody>
        {foodItems.map((item, index) => {
          return (
            <tr key={item.id}
              
              draggable
              onDragOver={() => handleDragOver(event, item)}
              onDragStart={() => setDragValues({...dragValues, source: item})}         
              onDragEnter={() => setDragValues({...dragValues, destination: item})}
              onDragEnd={handleSort}
            >
              <td>{index+1}</td>
              <td>
                <img
                  src={item.imageSource}
                  alt={item.name}
                  className="item-img"
                />
              </td>
              <td>{item.name}</td>
              <td className="item-description-td">
                <div className="item-description-ellipses">
                  {item.description}
                  <div className="item-description-tooltip">
                      <p style={{textAlign: "center"}}>{item.name}</p>
                      <hr style={{margin: "10px 0"}} />
                      {item.description}
                  </div>
                </div>
              </td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>{item.category?.name}</td>
              <td>
                {item.active ? (
                  <span style={{ backgroundColor: "green" }} className="item-status-icon">
                    ACTIVE
                  </span>
                ) : (
                  <span style={{ backgroundColor: "red" }} className="item-status-icon">
                    INACTIVE
                  </span>
                )}
              </td>
              <td className="food-items-table-actions-container">
                <span
                  className="material-symbols-rounded table-row-action-icon"
                  onClick={() => editFoodItem(item)}
                >
                  edit
                </span>

                <span className="material-symbols-rounded table-row-action-icon table-row-dragger" >
                  drag_indicator
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDisplay;
