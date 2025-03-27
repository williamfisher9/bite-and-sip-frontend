
import { useNavigate } from 'react-router-dom';
import './Coupons.css'

const CardDisplay = ({coupons}) => {
    const navigate = useNavigate()

    const editCoupon = (item) => {
        navigate(`/biteandsip/admin/coupons/${item.id}`);
    }

    return <div className='cards-grid'>
    {
        coupons.map((item) => {
            return <div className='card-item' key={item.id}>                
                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.code}</p>
                </div>

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.amount}</p>
                </div> 

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{`${new Date(item.fromDate + "T00:00:00").getMonth()+1}/${new Date(item.fromDate + "T00:00:00").getDate()}/${new Date(item.fromDate + "T00:00:00").getFullYear()}`}</p>
                </div>     

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{`${new Date(item.toDate + "T00:00:00").getMonth()+1}/${new Date(item.toDate + "T00:00:00").getDate()}/${new Date(item.toDate + "T00:00:00").getFullYear()}`}</p>
                </div> 

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.active}</p>
                </div> 

                <div className='card-actions-container'>
                        <span style={{ backgroundColor: item.active ? "green" : "red", padding: "5px 8px", borderRadius: "5px", fontSize: "12px", color: "#fff", height: "35px", display: "flex", justifyContent: "center", alignItems: "center"}}>{item.active ? "ACTIVE" : "INACTIVE"}</span>
                        <span className="material-symbols-rounded card-action-icon" onClick={() => editCoupon(item)}>edit</span>
                </div> 
  
            </div>
        })
    }
    </div>
}

export default CardDisplay