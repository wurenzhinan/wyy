import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllSearch from './pages/Search'
import Go from "./components/go"
import Phb from './components/paihangbang'
import Per from './pages/Per'




function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<AllSearch />}  ></Route>
          <Route path='/19723756' element={<Phb id="19723756" />}></Route>
          <Route path='/3779629' element={<Phb id="3779629" />}></Route>
          <Route path='/2884035' element={<Phb id="2884035" />}></Route>
          <Route path='/3778678' element={<Phb id="3778678" />}></Route>
          <Route path='/per' element={<Per id="1970559930" />}></Route>
        </Routes>
        <Go />
      </div>
    </BrowserRouter>
  )
}

export default App
