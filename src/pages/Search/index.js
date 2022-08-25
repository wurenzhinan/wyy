import { Input } from 'antd'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import './index.css'
import { DeleteOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import {
  PlayCircleOutlined
} from '@ant-design/icons'
import Go from '../../components/go'
import { UrlContext } from "../../App"



const { Search } = Input
function AllSearch () {
  const [search, setSearch] = useState([])

  useEffect(() => {
    console.log(Number([1.2]))
    const loadList = async () => {
      const res = await http.get('/search/hot/detail')
      setSearch(res.data)
    }
    loadList()
  }, [])

  const [songs, setSongs] = useState([])
  console.log(songs)
  const [list, setList] = useState([])
  const onSearch = (value) => {
    if (value) {
      const loadList = async () => {
        const res = await http.get(`/search?keywords=${value}`)
        if (res.code === 200) {
          setSongs(res.result.songs)
          console.log(res.result.songs)
        } else {
          alert("不存在")
        }
        // localStorage.setItem("list",value)
        // setList([])
        // console.log(list)
      }
      loadList()

    }
  }
  let onChangeValueToSearch = function (e) {
    console.log(e)
    let { value } = e.target
    let timer = null
    return function () {
      console.log(123)
      if (timer) clearTimeout(timer)
      timer =
        setTimeout(async () => {
          const res = await http.get(`/search?keywords=${value}`)
          if (res.code === 200) {
            setSongs(res.result.songs)
            console.log(res.result.songs)
          } else if (value === '') {
            setSongs([])
          } else {
            console.log("未找到")
          }
        }, 1200)
    }
  }
  const delt = () => {
    list = []
  }
  const navigate = useNavigate()
  const { dispactchMuscicUrl } = useContext(UrlContext)
  const pushShow = (id, url, name) => {
    let ids = id.toString()
    localStorage.setItem("picUrl", url)
    localStorage.setItem("name", name)
    dispactchMuscicUrl(url)
    console.log(ids)
    navigate(`/per?id=${ids}`)

  }
  const onClick = (e) => {
    console.log(e)
  }
  return (
    <div className='body'>

      <div className="nav">
        <h2>搜索</h2>
        <Search
          placeholder="搜索歌曲"
          allowClear
          onSearch={onSearch}
          onChange={(e) => onChangeValueToSearch.call(this, e)(e)}
          style={{
            width: "100%",
          }}
        />
      </div>
      {!isNaN(Number(songs)) ?
        (<div className="body1">
          <div className="history">
            <div><span>历史记录</span><DeleteOutlined onClick={delt} /></div>
            {list.map(item => <span key={uuidv4()}>{item}</span>)}
          </div>
          <div className="bangdan">
            <p>热搜榜</p>
            <ol>
              {search.map(item => (
                <li key={search.indexOf(item)} onClick={(e) => onClick(e)}>
                  <span>{`${search.indexOf(item) + 1} `}</span>
                  <span><p>{item.searchWord}</p><p>{item.content}</p></span>
                  <span>{item.score}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>)
        :
        (<div className="body2">
          {songs.map(item =>
          (<li key={item.id} >
            <span>
              <p>{item.name}</p>
              <p>{`${item.artists[0].name}-${item.album.name}`}</p>
            </span>
            <span><PlayCircleOutlined onClick={() => pushShow(item.id, item.album.artist.img1v1Url, item.name)} /></span>
          </li>))}
        </div>)
      }
    </div>
  )
}
export default AllSearch