import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import CartItems from './components/CartItems/CartItems'
import Menu from './components/Menu/Menu'

const App = () => {
  return <Router>
          <Routes>
            <Route path='/goodies' element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/goodies/' element={<Home />}></Route>
              <Route path='/goodies/home' element={<Home />}></Route>
              <Route path='/goodies/menu' element={<Menu />}></Route>
              <Route path='/goodies/home/categories/:category' element={<Home />}></Route>
              <Route path='/goodies/menu/categories/:category' element={<Menu />}></Route>
              <Route path='/goodies/cart' element={<CartItems />}></Route>
            </Route>
          </Routes>
        </Router>
}

export default App