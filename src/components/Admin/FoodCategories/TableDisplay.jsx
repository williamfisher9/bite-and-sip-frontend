import { useNavigate } from "react-router-dom";
import "./FoodCategories.css";

const TableDisplay = ({ foodCategories }) => {
  const navigate = useNavigate();

  const editFoodCategory = (item) => {
    navigate(`/biteandsip/admin/food-categories/${item.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>NAME</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {foodCategories.map((item) => {
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
  );
};

export default TableDisplay;
