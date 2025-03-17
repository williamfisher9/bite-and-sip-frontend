import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'

const App = () => {
  return <Router>
    <Routes>
      <Route path='/goodies' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='/goodies/' element={<Home />}></Route>
      </Route>
    </Routes>
  </Router>
}

export default App
