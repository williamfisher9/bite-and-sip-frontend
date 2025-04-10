import { useNavigate } from "react-router-dom";
import './FoodItems.css'
import {  useState } from "react";

const TableDisplay = ({ foodItems, updateFoodItems }) => {
  const navigate = useNavigate();

  const [dragValues, setDragValues] = useState({draggedItem: null, dragOverItem: null});

  const editFoodItem = (item) => {
    navigate(`/biteandsip/admin/food-items/${item.id}`);
  };

  const handleOnDragStart = (e) => {
    setDragValues({...dragValues, draggedItem: e.target.id});
  }

  

  const handleOnDragEnter = (e) => {
    setDragValues({...dragValues, dragOverItem: e.currentTarget.id});
  }



  const handleOnDragEnd = () => {
    const copyListItems = [...foodItems]

    console.log(dragValues)

    const dragItemContent = copyListItems[dragValues.draggedItem]

    copyListItems.splice(dragValues.draggedItem, 1)  // delete one element at index dragItem.current
    copyListItems.splice(dragValues.dragOverItem, 0, dragItemContent) // insert item dragItemContent at index dragOverItem.current

    setDragValues({draggedItem: null, dragOverItem: null})
    console.log(copyListItems)
    updateFoodItems(copyListItems)  
  }

  return <div style={{width: "100%", position: "relative"}} className="table-outer-container">
        
        <div style={{width: "100%", padding: "5px", marginBottom: "10px", fontWeight: "500", fontSize: "16px"}}>
          <div style={{width: "100%", display: "flex"}}>
            <div style={{width: "10%", textAlign: "left"}}>ITEM</div>
            <div style={{width: "15%", textAlign: "left"}}>NAME</div>
            
            <div style={{width: "10%", textAlign: "left", paddingLeft: "10px"}}>PRICE</div>
            <div style={{width: "10%", textAlign: "left"}}>RATING</div>
            <div style={{width: "10%", textAlign: "left"}}>CATEGORY</div>
            <div style={{width: "10%", textAlign: "left"}}>ACTIVE</div>
            <div style={{width: "25%", textAlign: "left", display: "inline-block"}}>DESC.</div>
            <div style={{width: "10%"}}></div>
          </div>
        </div>




        <div className="food-items-container" style={{ width: "100%", marginBottom: "10px", fontWeight: "500", fontSize: "16px" }}>
        
        {foodItems.map((item, index) => {
          return <div key={index} id={index} style={{width: "100%", 
                                            fontSize: "14px",
                                            display: "flex",
                                            padding: "5px",
                                            transition: "all 0.3s", 
                                            opacity:  dragValues.draggedItem == index ? "0.2" : 1 }}
                                draggable
                                onDragStart={(e) => handleOnDragStart(e)} 
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => handleOnDragEnter(e)} 
                                onDragEnd={handleOnDragEnd} 
                      >
                    


                      <div style={{width: "10%"}} className='item-data-field'>
                        <img
                          src={item.imageSource}
                          alt={item.name}
                          className="data-item-img"
                        />
                      </div>

                      <div style={{width: "15%", textWrap: "wrap"}} className='item-data-field'>{item.name}</div>

                      

                      <div style={{width: "10%", paddingLeft: "10px"}} className='item-data-field'>${item.price}</div>
                      <div style={{width: "10%"}} className='item-data-field'>{item.rating}</div>
                      <div style={{width: "10%"}} className='item-data-field'>{item.category?.name}</div>

                      <div style={{width: "10%"}} className='item-data-field'>
                        {item.active ? (
                          <span style={{ backgroundColor: "rgb(24, 131, 0)", color: "#fff" }} className="item-status-icon">
                            ACTIVE
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "red" }} className="item-status-icon">
                            INACTIVE
                          </span>
                        )}
                      </div>

                      <div className="item-description-td">
                        <div className="item-description-ellipses">
                          {item.description}
                          <div className="item-description-tooltip">
                              <p style={{textAlign: "center"}}>{item.name}</p>
                              <hr style={{margin: "10px 0"}} />
                              {item.description}
                          </div>
                        </div>
                      </div>

                      <div style={{width: "10%", display: "flex", justifyContent: "end", alignItems: "center"}} className="food-items-table-actions-container">
                        <span
                          className="material-symbols-rounded table-row-action-icon"
                          onClick={() => editFoodItem(item)}
                        >
                          edit
                        </span>

                        <span className="material-symbols-rounded table-row-action-icon table-row-dragger" >
                          drag_indicator
                        </span>
                      </div>



                    </div>

          
        })}

</div>

      </div>
};

export default TableDisplay;
