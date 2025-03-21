import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import CartItems from './components/CartItems/CartItems'
import Menu from './components/Menu/Menu'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import UserHome from './components/UserHome/UserHome'

const App = () => {
  return <Router>
          <Routes>
            <Route path='/biteandsip' element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/biteandsip/' element={<Home />}></Route>
              <Route path='/biteandsip/home' element={<Home />}></Route>
              <Route path='/biteandsip/menu' element={<Menu />}></Route>
              <Route path='/biteandsip/home/categories/:category' element={<Home />}></Route>
              <Route path='/biteandsip/menu/categories/:category' element={<Menu />}></Route>
              <Route path='/biteandsip/cart' element={<CartItems />}></Route>
              <Route path='/biteandsip/login' element={<Login />}></Route>
              <Route path='/biteandsip/register' element={<Register />}></Route>
              <Route path='/biteandsip/forgot-password' element={<ForgotPassword />}></Route>
            </Route>
          </Routes>
        </Router>
}

export default App