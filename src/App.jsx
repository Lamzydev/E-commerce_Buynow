
import {Routes, Route} from 'react-router'
import {HomePage} from './pages/HomePage'
import {CheckoutPage} from './pages/CheckoutPage'
import Navbar from './components/Navbar'
import './App.css'



function App() {

  return (
   <>

     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<div>Orders Page</div>} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    
      </> 
  )
}
export default App
 