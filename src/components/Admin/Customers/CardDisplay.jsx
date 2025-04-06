import { createSearchParams, useNavigate } from "react-router-dom"

const CardDisplay = ({data}) => {
    const navigate = useNavigate()

    const showCustomerDetails = (id) => {
        navigate({
            pathname: "/biteandsip/admin/customers/view",
            search: createSearchParams({
                customer_id: `${id}`
            }).toString()
        });
    }
    return <div className='cards-grid'>
    {
        data.map((item) => {
            return <div className='card-item' key={item.id}>                
                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "14px"}}>{item.username}</p>
                </div>

                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.firstName} {item.lastName}</p>
                </div> 

               
                <div>
                    <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500", fontSize: "18px"}}>{item.enabled ? <span style={{backgroundColor: "green", color: "white", padding: "3px 6px", borderRadius: "5px"}}>ACTIVE</span> : <span style={{backgroundColor: "red", color: "white", padding: "3px 6px", borderRadius: "5px"}}>INACTIVE</span>}</p>
                </div> 

                <div>
                <span className="material-symbols-rounded" 
                style={{border: "2px solid black", borderRadius: "5px", padding: "5px", cursor: "pointer"}}
                onClick={() => showCustomerDetails(item.id)}>more_horiz</span>
                </div>
  
            </div>
        })
    }
    </div>

}

export default CardDisplay