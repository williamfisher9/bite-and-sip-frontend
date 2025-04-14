import { useNavigate } from "react-router-dom";
import "./FoodCategories.css";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";

const TableDisplay = ({ foodCategories, updateFoodCategories, paginationData, loadPage, updateSelectedPageSize }) => {
  const navigate = useNavigate();

  const [dragValues, setDragValues] = useState({draggedItem: null, dragOverItem: null});

  const editFoodCategory = (item) => {
    navigate(`/biteandsip/admin/food-categories/${item.id}`);
  };

  const handleOnDragStart = (e) => {
    //e.preventDefault()
    setDragValues({...dragValues, draggedItem: e.target.id});
  }

  

  const handleOnDragEnter = (e) => {
    setDragValues({...dragValues, dragOverItem: e.currentTarget.id});
  }

  const handleOnDragEnd = () => {
    const copyListItems = [...foodCategories]

    const dragItemContent = copyListItems[dragValues.draggedItem]

    copyListItems.splice(dragValues.draggedItem, 1)  // deletes one element at index dragItem.current and shifts all items down
    copyListItems.splice(dragValues.dragOverItem, 0, dragItemContent) // insert item dragItemContent at index dragOverItem.current and shifts items from this index to the end up

    updateFoodCategories(dragValues.draggedItem, dragValues.dragOverItem)  

    setDragValues({draggedItem: null, dragOverItem: null})

  }

  return <div className="table-outer-container">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>ITEM</th>
          <th>NAME</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}></th>
        </tr>
      </thead>
      <tbody>
        {foodCategories.map((item, index) => {
          return (
            <tr key={index} id={index} style={{fontSize: "14px", transition: "all 0.3s", 
              opacity: dragValues.draggedItem == index ? "0.2" : 1,
              backgroundColor:  dragValues.dragOverItem == index && dragValues.draggedItem != dragValues.dragOverItem ? "rgba(0, 0, 255 ,0.2)" : "transparent" }}
    
              draggable
              onDragStart={(e) => handleOnDragStart(e)} 
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => handleOnDragEnter(e)} 
              onDragEnd={handleOnDragEnd} >

              <td>{index+1}</td>
              <td>
                <img
                  src={item.imageSource}
                  alt={item.name}
                  className="food-category-img"
                />
              </td>
              <td>{item.name}</td>
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
              <td style={{ textAlign: "end" }}>
                <span
                  className="material-symbols-rounded table-row-action-icon"
                  onClick={() => editFoodCategory(item)}
                >
                  edit
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <Pagination paginationData={paginationData} loadPage={loadPage} updateSelectedPageSize={updateSelectedPageSize} />

  </div>
  };

export default TableDisplay;
