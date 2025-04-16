import { useNavigate } from "react-router-dom";
import './Coupons.css'
import Pagination from "../Pagination/Pagination";

const TableDisplay = ({ coupons, paginationData, loadPage, updateSelectedPageSize }) => {
  const navigate = useNavigate();

  const editCoupon = (item) => {
    navigate(`/biteandsip/admin/coupons/${item.id}`);
  };

  return <div className="table-outer-container">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>CODE</th>
          <th>AMOUNT</th>
          <th>FROM DATE</th>
          <th>TO DATE</th>
          <th>ACTIVE</th>
          <th style={{ textAlign: "center" }}></th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index+1}</td>
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
              <td style={{ textAlign: "end" }}>
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

    <Pagination paginationData={paginationData} loadPage={loadPage} updateSelectedPageSize={updateSelectedPageSize} />

    </div>
};

export default TableDisplay;
