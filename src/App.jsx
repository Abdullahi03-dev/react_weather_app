import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './styles/style.css'
import Index from './pages/index.jsx'
import Home from "./pages/home.jsx"
import Search from "./pages/search.jsx"

function App() {

  return (
    <>
  <Router>
    <Routes>
  <Route path='/' element={<Index/>}/>
  <Route path='/home' element={<Home />}/>
  <Route path='/search' element={<Search/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
