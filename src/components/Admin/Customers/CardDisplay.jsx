import { IoIosMore } from "react-icons/io";
import { createSearchParams, useNavigate } from "react-router-dom"
import avatarImg from '../../../assets/avatar.png';
import { RiIdCardLine } from "react-icons/ri";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { BiRun } from "react-icons/bi";

import './Customers.css'

const CardDisplay = ({data}) => {
    const navigate = useNavigate();

    const showCustomerDetails = (id) => {
        navigate({
            pathname: "/biteandsip/admin/customers/view",
            search: createSearchParams({
                customer_id: `${id}`
            }).toString()
        });
    }

    return <div className='users-cards-grid'>
        {
            data.map((item) => {
                return <div className='user-card' key={item.id}>
                        <div className='user-card-img-and-actions'>
                            <img src={item.imageSource != null ? item.imageSource : avatarImg} alt={item.imageSource} />
    
                            <div className='user-card-action' onClick={() => showCustomerDetails(item.id)}>
                                <IoIosMore size={20} color='#fff'/>
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