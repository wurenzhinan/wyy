import { Input } from 'antd'
import React from 'react'
import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import './index.css'
import { DeleteOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'


const { Search } = Input
function AllSearch () {
  const [search, setSearch] = useState([])
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/search/hot/detail')
      setSearch(res.data)
    }
    loadList()
  }, [])

  const [songs, setSongs] = useState([])
  console.log(songs)
  const list = []
  const onSearch = (value) => {
    if (value) {
      const loadList = async () => {
        const res = await http.get(`/search?keywords=${value}`)
        if (res) {
          setSongs(res.result.songs)
          console.log(res.result.songs)
        } else {
          alert("不存在")
        }
        list.push(value)
      }
      loadList()
    }
  }
  const delt = () => {
    list = []
  }
  return (
    <>
      <div className="nav">
        <h2>搜索</h2>
        <Search
          placeholder="搜索歌曲"
          allowClear
          onSearch={onSearch}
          style={{
            width: "100%",
          }}
        />
      </div>
      {songs == [] ?
        (<div className="body1">
          <div className="history">
            <div><span>历史记录</span><DeleteOutlined onClick={delt} /></div>
            {list.map(item => <span key={uuidv4()}>{item}</span>)}
          </div>
          <div className="bangdan">
            <p>热搜榜</p>
            <ol>
              {search.map(item => (
                <li key={search.indexOf(item)}>
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
            <p>{item.name}</p>
            <p>{`${item.artists[0].name}-${item.album.name}`}</p>
          </li>))}
        </div>)
      }
    </>
  )
}
export default AllSearch