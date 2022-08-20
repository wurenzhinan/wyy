import { useEffect, useState } from 'react'
import React from 'react'
import { http } from '../../utils/http'
import { Input } from 'antd'
import './Home.css'
import { v4 as uuidv4 } from 'uuid'


const { Search } = Input
const onSearch = (value) => console.log(value)
function Home () {
  const [search, setSearch] = useState()
  // useEffect(() => {
  //   const loadList = async () => {
  //     const res = await http.get('/search/hot/detail')
  //     setSearch(res.data)
  //   }
  //   loadList()
  // }, [])
  const [all, setAll] = useState([])
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/toplist/detail ')
      setAll(res.list.slice(0, 4))
      console.log(res.list.slice(0, 4))
    }
    loadList()
  }, [])
  return (
    <>
      <div className="nav">
        <h2>网易云音乐</h2>
        <Search
          placeholder="搜索歌曲"
          allowClear
          onSearch={onSearch}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className='paihang'>
        {all.map(item => (
          <div className='paihang-item' key={uuidv4()}>
            <img
              src={item.coverImgUrl} alt="" style={{ witdh: "12vw", height: "12vh" }} />
            <p>{item.updateFrequency}</p>
            <ol>
              {item.tracks.map(item => <li key={uuidv4()}>{`${item.first}-${item.second}`}</li>)}
            </ol>
          </div>
        ))}
      </div>
      <div className="footer">
        点击了解<a href="https://st.music.163.com/official-terms/privacy">《隐私保护指引》</a>
      </div>
    </>
  )
}
export default Home