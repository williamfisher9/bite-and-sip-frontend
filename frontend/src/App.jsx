import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import CartItems from './components/CartItems/CartItems'
import Menu from './components/Menu/Menu'

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
            </Route>
          </Routes>
        </Router>
}

export default App