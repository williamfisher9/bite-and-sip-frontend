import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Menu from './components/Menu/Menu'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import FoodCategories from './components/Admin/FoodCategories/FoodCategories'
import FoodItems from './components/Admin/FoodItems/FoodItems'
import FoodItemEditor from './components/Admin/FoodItems/Editor'
import FoodCategoryEditor from './components/Admin/FoodCategories/Editor'
import Cart from './components/Cart/Cart'
import StripeCheckout from './components/Checkout/StripeCheckout'
import Coupons from './components/Admin/Coupons/Coupons'
import CouponsEditor from './components/Admin/Coupons/Editor'
import PaymentStatus from './components/Checkout/PaymentStatus'
import Customers from './components/Admin/Customers/Customers'
import Employees from './components/Admin/Employees/Employees'
import EmployeeEditor from './components/Admin/Employees/Editor'
import Orders from './components/Orders/Orders'
import Settings from './components/Admin/Settings/Settings'
import ResetForgottenPassword from './components/ForgotPassword/ResetForgottenPassword/ResetForgottenPassword'
import Profile from './components/Profile/Profile'
import CustomerDetails from './components/Admin/Customers/CustomerDetails/CustomerDetails'
import Dashboard from './components/Admin/Dahsboard/Dashboard'

const App = () => {
  return <Router>
          <Routes>
            <Route path='/biteandsip' element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/biteandsip/' element={<Home />}></Route>
              <Route path='/biteandsip/home' element={<Home />}></Route>
              <Route path='/biteandsip/menu' element={<Menu />}></Route>
              <Route path='/biteandsip/home/category/:category' element={<Home />}></Route>
              <Route path='/biteandsip/menu/category/:category' element={<Menu />}></Route>
              <Route path='/biteandsip/cart' element={<Cart />}></Route>
              <Route path='/biteandsip/login' element={<Login />}></Route>
              <Route path='/biteandsip/register' element={<Register />}></Route>
              <Route path='/biteandsip/forgot-password' element={<ForgotPassword />}></Route>
              <Route path='/biteandsip/reset-forgotten-password' element={<ResetForgottenPassword />}></Route>

              <Route path='/biteandsip/cart/checkout' element={<StripeCheckout />}></Route>
              <Route path='/biteandsip/:source/orders' element={<Orders />}></Route>
              <Route path='/biteandsip/profile' element={<Profile />}></Route>
              <Route path='/biteandsip/cart/payment-status' element={<PaymentStatus />}></Route>
              
              <Route path='/biteandsip/admin/food-categories' element={<FoodCategories />}></Route>
              <Route path='/biteandsip/admin/food-items' element={<FoodItems />}></Route>
              <Route path='/biteandsip/admin/food-categories/:itemId' element={<FoodCategoryEditor />}></Route>
              <Route path='/biteandsip/admin/food-items/:itemId' element={<FoodItemEditor />}></Route>
              <Route path='/biteandsip/admin/coupons' element={<Coupons />}></Route>
              <Route path='/biteandsip/admin/coupons/:itemId' element={<CouponsEditor />}></Route>
              <Route path='/biteandsip/admin/customers' element={<Customers />}></Route>
              <Route path='/biteandsip/admin/employees' element={<Employees />}></Route>
              <Route path='/biteandsip/admin/employees/:itemId' element={<EmployeeEditor />}></Route>
              <Route path='/biteandsip/admin/settings' element={<Settings />}></Route>
              <Route path='/biteandsip/admin/customers/view' element={<CustomerDetails />}></Route>
              <Route path='/biteandsip/admin/dashboard' element={<Dashboard />}></Route>

              
            </Route>
          </Routes>
        </Router>
}

export default App