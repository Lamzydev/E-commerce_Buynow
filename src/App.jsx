
import {Routes, Route} from 'react-router'
import {HomePage} from './pages/HomePage'
import Navbar from './components/Navbar'
import './App.css'



function App() {

  return (
   <>

     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    
      </> 
  )
}
export default App
 