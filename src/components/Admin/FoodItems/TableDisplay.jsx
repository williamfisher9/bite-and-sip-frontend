import { useNavigate } from "react-router-dom";
import './FoodItems.css'

const TableDisplay = ({ foodItems }) => {
  const navigate = useNavigate();

  const editFoodItem = (item) => {
    navigate(`/biteandsip/admin/food-items/${item.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>NAME</th>
          <th style={{width: "200px", display: "inline-block"}}>DESC.</th>
          <th>PRICE</th>
          <th>RATING</th>
          <th>CATEGORY</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {foodItems.map((item) => {
          return (
            <tr key={item.id}>
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
              <td style={{ textAlign: "center" }}>
                <span
                  className="material-symbols-rounded table-row-action-icon"
                  onClick={() => editFoodItem(item)}
                >
                  edit
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
