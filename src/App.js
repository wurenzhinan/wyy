import "./App.css"
import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AllSearch from "./pages/Search"
import Go from "./components/go"
import Track from "./pages/Track"
import PerSong from "./pages/perSong"
import React, { useState, createContext } from "react"

const UrlContext = createContext({ musicUrl: "", dispactchMuscicUrl: () => { }, name: "", setName: () => { } })
UrlContext.displayName = 'UrlContext'
console.log(UrlContext)
export { UrlContext }
function App () {
  const [music, setMusic] = useState({ url: "" })
  const [name, setName] = useState('')
  // const [url, setUrl] = useState('')
  // setUrl(window.location.href)
  // console.log(url)
  // console.log(url === 'http://localhost:3000')
  // console.log(typeof url)
  return (
    <BrowserRouter>
      <div className="App">
        <Go />
        {/* {url == 'http://localhost:3000' ? '' : <Go />} */}
        <UrlContext.Provider value={{ musicUrl: music, dispactchMuscicUrl: setMusic, name: name, setName: setName }} >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<AllSearch />}></Route>
            <Route path="/track" element={<Track />}></Route>
            <Route path="/per" element={<PerSong />}></Route >
            <Route path="/search/per" element={<PerSong />}></Route >
          </Routes>
        </UrlContext.Provider>
      </div>
    </BrowserRouter >
  )
}

export default App