import { TiBusinessCard } from 'react-icons/ti'
import './CardDisplay.css'
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'
import { RiIdCardLine } from 'react-icons/ri'
import { BiRun } from 'react-icons/bi'
import { TbEdit } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const CardDisplay = ({data}) => {
    const navigate = useNavigate();

    const editEmployee = (element) => {
        navigate(`/biteandsip/admin/employees/${element.id}`)
    }

    return <div className='users-cards-grid'>
    {
        data.map((item) => {
            return <div className='user-card' key={item.id}>
                    <div className='user-card-img-and-actions'>
                        <img src={item.imageSource} alt={item.imageSource} />

                        <div className='user-card-action' onClick={() => editEmployee(item)}>
                            <TbEdit size={20} color='#fff'/>
                            <span style={{fontSize: "16px", color: "#fff"}}>EDIT</span>
                        </div>
                    </div>

                    <div className='user-card-details'>
                        <div className='user-card-field'>
                            <RiIdCardLine size={25}/>
                            <span>{item.firstName} {item.lastName}</span>
                        </div> 

                        <div className='user-card-field'>
                            <MdOutlineMail size={25}/>
                            <span>{item.username}</span>
                        </div> 

                        <div className='user-card-field'>
                            <MdOutlineLocalPhone size={25}/>
                            <span>{item.phoneNumber}</span>
                        </div> 

                        <div className='user-card-field'>
                            <TiBusinessCard size={25}/>
                            <span>{item.userType}</span>
                        </div> 
                    
                        <div className='user-card-field'>
                            <BiRun size={25}/>
                            <p className={`user-state ${item.enabled ? 'active-user' : 'inactive-user'}`}>{item.enabled ? 'ACTIVE' : 'INACTIVE' }</p>
                        </div> 
                    </div>
            

                
            </div>
        })
    }
    </div>
}

export default CardDisplay