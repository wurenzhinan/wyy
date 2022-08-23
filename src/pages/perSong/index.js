import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { http } from '../../utils/http'

function PerSong () {
  const [releted, setReleted] = useState([])
  const [comment, setComment] = useState([])
  const [picUrl, setPicUrl] = useState()
  const [lyric, setLyric] = useState([])
  let location = useLocation()
  console.log(location)
  let queryID = location.search.slice(4)
  let audio = new Audio()
  useEffect(() => {
    const loadList = async () => {
      const res1 = await http.get(`/related/playlist?id=${queryID}`)
      const res2 = await http.get(`/comment/hot?id=${queryID}&type=0`)
      const res3 = await http.get(`/song/url?id=${queryID}`)
      const res4 = await http.get(`/lyric?id=${queryID}`)
      console.log(res1)
      console.log(res2)
      console.log(res3)
      console.log(res4)
      // setSong(res3.data[0].url)
      // setReleted()
      audio.src = res3.data[0].url
      audio.controls = true
      // setPicUrl(res3.al.picUrl)

    }
    loadList()
  }, [])


  return (
    <>
      <div onClick={() => { console.log(123); audio.play() }}>放歌中...</div>
    </>
  )
}

export default PerSong

