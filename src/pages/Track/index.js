import { useEffect, useState, useContext } from "react"
import { http } from '../../utils/http'
import { useLocation, useNavigate } from "react-router-dom"
import './indec.css'
import {
  PlayCircleOutlined
} from '@ant-design/icons'
import React from 'react'
import Go from "../../components/go"
import { UrlContext } from "../../App"



function Track () {
  const { dispactchMuscicUrl } = useContext(UrlContext)
  const [songs, setSongs] = useState([])
  let location = useLocation()
  console.log(location)
  let queryID = location.search.slice(4)
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get(`/playlist/detail?id=${queryID}`)
      setSongs(res.playlist.tracks)
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
  return (
    <div className="body">
      <div className="head"></div>
      <div className="songs">
        <ol>
          {
            songs.map((item, index) => {
              let str = item.ar.map(item => item.name)
              let realStr = str.join("/")

              return (
                <li key={index}>
                  <span>{index + 1}</span>
                  <span><p>{item.name}</p><p>{`${realStr}-${item.al.name}`}</p ></span>
                  <span><PlayCircleOutlined onClick={() => pushShow(item.id, item.al.picUrl, item.name)} /></span>
                </li>
              )
            })}
        </ol>
      </div>
    </div>
  )
}
export default Track