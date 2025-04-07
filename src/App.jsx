import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import NavBar from './components/NavBar'
import NotFound404 from './components/NotFound404'
import { CartContextProvider } from './components/CartContext'
import CartContainer from './components/CartContainer'
import './App.css'

function App() {

  return (
    <CartContextProvider>
      <Router className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/category/:cid' element={<ItemListContainer />} />
          <Route path='/detail/:pid' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<CartContainer />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </Router>
    </CartContextProvider>
  )
}
export default App
