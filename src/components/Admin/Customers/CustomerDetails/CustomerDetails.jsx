import { useContext, useEffect, useState } from 'react';
import './CustomerDetails.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

import avatarImg from '../../../../assets/avatar.png'
import { GlobalStateContext } from '../../../../context/GlobalState';
import { BACKEND_URL } from '../../../../constants/Constants';
import { MenuContext } from '../../../../context/Menu';
import Orders from '../../../Orders/Orders';

const CustomerDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const navigate = useNavigate();
    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
    const {clearMenuItemsState} = useContext(MenuContext)

    const [formFields, setFormFields] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        imageSource: "",
        orders: []
      });

      useEffect(() => {
        setActiveNavbarItem("CUSTOMERS")
        axios.get(`${BACKEND_URL}/api/v1/app/admin/customers/${searchParams.get('customer_id')}`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          
          res.data.message.orders.map(item => {
            item.showDetails = false;
          })
          
          setFormFields(res.data.message);
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
            }
        });
      }, [])

      const getFormmattedDate = (date) => {
        return `${String(new Date(date).getMonth()+1).padStart(2, '0')}/${String(new Date(date).getDate()).padStart(2, '0')}/${new Date(date).getFullYear()} - ${String(new Date(date).getHours()).padStart(2, '0')}:${String(new Date(date).getMinutes()).padStart(2, '0')}`
      }

      const showOrderDetails = (id) => {
        formFields.orders.map(order => {
            if(order.uuid == id){
                order.showDetails = !order.showDetails;
            }
        }) 
        
        setFormFields({...formFields})
      }

    return <div className="customer-details-outer-container">
        <div className='customer-details-inner-container'>
            <div className='full-details-container'>
                    <div className='img-container'>
                        <img src={formFields.imageSource == "" ? avatarImg : formFields.imageSource} />
                    </div>
                    <div className='details-container'>
                        <div className='value-container'>
                            <span className="material-symbols-rounded">id_card</span>
                            <span>{formFields.firstName} {formFields.lastName}</span>
                        </div>
                        <div className='value-container'>
                            <span className="material-symbols-rounded">email</span>
                            <span>{formFields.username}</span>
                        </div>
                        <div className='value-container'>
                            <span className="material-symbols-rounded">phone</span>
                            <span>{formFields.phoneNumber}</span>
                        </div>
                    </div>
            </div>

            <div className='orders-container'>
                <Orders />
            </div>
        </div>
    </div>
}

export default CustomerDetails;