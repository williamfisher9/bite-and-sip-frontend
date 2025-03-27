import { useNavigate } from "react-router-dom";
import './Coupons.css'

const TableDisplay = ({ coupons }) => {
  const navigate = useNavigate();

  const editCoupon = (item) => {
    navigate(`/biteandsip/admin/coupons/${item.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>CODE</th>
          <th>AMOUNT</th>
          <th>FROM DATE</th>
          <th>TO DATE</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((item) => {

          const date = new Date(item.fromDate + "T00:00:00");
          const [month, day, year] = [
            date.getMonth()+1,
            date.getDate(),
            date.getFullYear(),
          ];

          return (
            <tr key={item.id}>

              <td>{item.code}</td>
              <td>{item.amount}</td>
              <td>{`${new Date(item.fromDate + "T00:00:00").getMonth()+1}/${new Date(item.fromDate + "T00:00:00").getDate()}/${new Date(item.fromDate + "T00:00:00").getFullYear()}`}</td>
              <td>{`${new Date(item.toDate + "T00:00:00").getMonth()+1}/${new Date(item.toDate + "T00:00:00").getDate()}/${new Date(item.toDate + "T00:00:00").getFullYear()}`}</td>
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
                  onClick={() => editCoupon(item)}
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
