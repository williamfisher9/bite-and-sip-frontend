import { useNavigate } from "react-router-dom"

const TableDisplay = ({data}) => {
    const navigate = useNavigate();
    
    const editEmployee = (element) => {
        navigate(`/biteandsip/admin/employees/${element.id}`)
    }
    return <table>
        <thead>
            <tr>
                <th>EMAIL</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ROLE</th>
                <th>ACTIVE</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((element) => {
                    return <tr key={element.id}>
                        <td>{element.username}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.userType}</td>
                        <td>{element.enabled ? <span style={{backgroundColor: "green", color: "white", padding: "3px 6px", borderRadius: "5px"}}>ACTIVE</span> : <span style={{backgroundColor: "red", color: "white", padding: "3px 6px", borderRadius: "5px"}}>INACTIVE</span>}</td>
                        <td style={{textAlign: "end"}}><span className="material-symbols-rounded" style={{border: "2px solid black", borderRadius: "5px", padding: "5px", 
                            cursor: "pointer"}} onClick={() => editEmployee(element)}>edit</span></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}

export default TableDisplay