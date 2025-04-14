import { useNavigate } from "react-router-dom";
import './FoodItems.css'
import {  useState } from "react";
import Pagination from "../Pagination/Pagination";

const TableDisplay = ({ foodItems, updateFoodItems, paginationData, loadPage, updateSelectedPageSize }) => {
  const navigate = useNavigate();

  const [dragValues, setDragValues] = useState({draggedItem: null, dragOverItem: null});

  const editFoodItem = (item) => {
    navigate(`/biteandsip/admin/food-items/${item.id}`);
  };

  const handleOnDragStart = (e) => {
    //e.preventDefault()
    setDragValues({...dragValues, draggedItem: e.target.id});
  }

  const handleOnDragEnter = (e) => {
    setDragValues({...dragValues, dragOverItem: e.currentTarget.id});
  }

  const handleOnDragEnd = () => {
    const copyListItems = [...foodItems]

    const dragItemContent = copyListItems[dragValues.draggedItem]

    copyListItems.splice(dragValues.draggedItem, 1)  // deletes one element at index dragItem.current and shifts all items down
    copyListItems.splice(dragValues.dragOverItem, 0, dragItemContent) // insert item dragItemContent at index dragOverItem.current and shifts items from this index to the end up

    updateFoodItems(dragValues.draggedItem, dragValues.dragOverItem)  

    setDragValues({draggedItem: null, dragOverItem: null})

  }

  return <div className="table-outer-container">
        <table className="food-categories-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ITEM</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>RATING</th>
                    <th>CATEGORY</th>
                    <th>ACTIVE</th>
                    <th>DESC.</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
            {
              foodItems.map((item, index) => {
                return <tr key={index} id={index} style={{fontSize: "14px", transition: "all 0.3s", 
                  opacity: dragValues.draggedItem == index ? "0.2" : 1,
                  backgroundColor:  dragValues.dragOverItem == index && dragValues.draggedItem != dragValues.dragOverItem ? "rgba(0, 0, 255 ,0.2)" : "transparent" }}
        
                  draggable
                  onDragStart={(e) => handleOnDragStart(e)} 
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => handleOnDragEnter(e)} 
                  onDragEnd={handleOnDragEnd} >
                    

                    <td style={{width: "40px"}}>
                      {index+1}
                    </td>


                      <td style={{width: "100px"}}>
                        <img
                          src={item.imageSource}
                          alt={item.name}
                          className="data-item-img"
                        />
                      </td>

                      <td style={{width: "230px", textWrap: "wrap"}} className=''>
                        {item.name}
                      </td>

                      

                      <td style={{width: "100px"}} className=''>${item.price}</td>
                      <td style={{width: "50px"}} className=''>{item.rating}</td>
                      <td style={{width: "100px"}} className=''>{item.category?.name}</td>

                      <td style={{width: "100px"}}>
                        {item.active ? (
                          <span style={{ backgroundColor: "rgb(24, 131, 0)", color: "#fff" }} className="item-status-icon">
                            ACTIVE
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "red" }} className="item-status-icon">
                            INACTIVE
                          </span>
                        )}
                      </td>

                      <td style={{width: "400px", position: "relative"}}>
                        <div className="item-description-ellipses">
                          {item.description}
                          <div className="item-description-tooltip">
                              <p style={{textAlign: "center"}}>{item.name}</p>
                              <hr style={{margin: "10px 0"}} />
                              {item.description}
                          </div>
                        </div>
                      </td>

                      <td style={{ textAlign: "end"}}>
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
        })
        }
            </tbody>
        </table>



        

        <Pagination paginationData={paginationData} loadPage={loadPage} updateSelectedPageSize={updateSelectedPageSize} />

      </div>
};

export default TableDisplay;
