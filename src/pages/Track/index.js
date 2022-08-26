import { useEffect, useState, useContext } from "react"
import { http } from '../../utils/http'
import { useLocation, useNavigate } from "react-router-dom"
import './indec.css'
import {
  PlayCircleOutlined,
  CaretRightOutlined
} from '@ant-design/icons'
import React from 'react'
import { UrlContext } from "../../App"



function Track () {
  const { dispactchMuscicUrl } = useContext(UrlContext)
  const [songs, setSongs] = useState([])
  const [tracks, setTracks] = useState({})
  let location = useLocation()
  console.log(location)
  let queryID = location.search.slice(4)
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get(`/playlist/detail?id=${queryID}`)
      console.log(res)
      console.log(res)
      setSongs(res.playlist.tracks)
      setTracks(res.playlist)
    }
    loadList()
  }, [])
  const navigate = useNavigate()
  const pushShow = (id, url, name) => {
    let ids = id.toString()
    localStorage.setItem("picUrl", url)
    localStorage.setItem("name", name)
    dispactchMuscicUrl(url)
    console.log(ids)
    navigate(`/per?id=${ids}`)

  }
  console.log(songs)
  const toFixed = (num, decimal) => {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
    } else {
      num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
  }
  return (
    <div className="body">
      <img className="cover" src={tracks.coverImgUrl} alt="" />
      <span className="trac">歌单</span>
      <div className="container">
        <div className="trac-header">
          <img className="trac-img" src={tracks.coverImgUrl} alt="" />
          <span className="liulan"> <CaretRightOutlined />{toFixed(tracks.playCount / 100000000, 1) + '亿'}</span>
          <span className="tr-hd-name">{tracks.name}</span>
          <div className="logo">
            <span><img src="http://p1.music.126.net/fL9ORyu0e777lppGU3D89A==/109951167206009876.jpg" alt="" />网易云音乐</span>
          </div>
          <p>{tracks.description}</p>

        </div>
        <div className="trac-body">
          <div className="trb-hd">
            <PlayCircleOutlined />
            <span>播放全部</span>
            <span className="count">(共100首歌)</span>
          </div>
          <div className="songs">
            {
              songs.map((item, index) => {
                let str = item.ar.map(item => item.name)
                let realStr = str.join("/")
                return (
                  <div key={index} className="song-item">
                    <span className="pm">{index + 1}</span>
                    <span className="info" ><span className="name">{item.name}</span><span className="content">{`${realStr}-${item.al.name}`}</span></span>
                    <span className="bof"><PlayCircleOutlined onClick={() => pushShow(item.id, item.al.picUrl, item.name)} /></span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Track