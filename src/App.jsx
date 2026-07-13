
import {Routes, Route} from 'react-router'
import {HomePage} from './pages/HomePage'
import {CheckoutPage} from './pages/CheckoutPage'
import {OrdersPage} from './pages/OrdersPage'
import Navbar from './components/Navbar'
import './App.css'



function App() {

  return (
   <>

     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    
      </> 
  )
}
export default App
 