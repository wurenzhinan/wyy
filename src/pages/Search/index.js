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
  const [flag, setFlag] = useState(false)
  const onSearch = (value) => {
    setFlag(true)
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
    setFlag(false)
    let { value } = e.target
    let timer = null
    return function () {
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
  const setHistoryItem = (keyword) => {
    let { historyItems } = localStorage
    console.log("historyItems", historyItems)
    if (historyItems == undefined) {
      historyItems = keyword
    } else {
      historyItems = keyword + '|' + historyItems.split('|').filter(e => e != keyword).join('|')
      localStorage.historyItems = historyItems
    }
    console.log(historyItems)
    console.log(localStorage.getItem('historyItems'))

  }
  const onClick = (e) => {
    console.log(e)
    // e.stopPropagation()
    // console.log(e)
    // if (e.target.nodeName != 'DIV') {
    //   console.log(e.target.nodeName)
    //   // e.stopPropagation()
    // } else {
    //   console.log(e)
    // }
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
            <div className='hs-hd'><span>历史记录</span><DeleteOutlined onClick={delt} /></div>
            {list.map(item => <span key={uuidv4()}>{item}</span>)}
          </div>
          <div className="bangdan">
            <p>热搜榜</p>
            <div className='hot'>
              {search.map((item, index) => (
                <div key={index} className='hot-item'>
                  <span className='pm' style={index < 3 ? { color: 'red' } : {}}>{index + 1}</span>
                  <span className='info' onClick={(e) => setHistoryItem(e.target.innerText)}><span className='name'>{item.searchWord}{index == 0 ? <img src='https://p1.music.126.net/2zQ0d1ThZCX5Jtkvks9aOQ==/109951163968000522.png' /> : ''}</span><span className='content'>{item.content}</span></span>
                  <span className='score'>{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>)
        :
        (<div className="body2">
          {songs.map(item =>
          (<div className='search-item' key={item.id} >
            <span className='info'>
              <span className='name'>{item.name}</span>
              <span className='content'>{`${item.artists[0].name}-${item.album.name}`}</span>
            </span>
            <span className='bof'><PlayCircleOutlined onClick={() => pushShow(item.id, item.album.artist.img1v1Url, item.name)} /></span>
          </div>))}
        </div>)
      }
    </div>
  )
}
export default AllSearch