import "./App.css"
import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AllSearch from "./pages/Search"
import Go from "./components/go"
import Track from "./pages/Track"
import PerSong from "./pages/perSong"

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<AllSearch />}></Route>
          <Route path="/track" element={<Track />}></Route>
          <Route path="/per" element={<PerSong />}></Route >
          <Route path="/search/per" element={<PerSong />}></Route >
        </Routes>
        <Go />
      </div>
    </BrowserRouter>
  )
}

export default App