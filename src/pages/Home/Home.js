import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import './Home.css'
import { v4 as uuidv4 } from 'uuid'
import { Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Phb from '../../components/paihangbang'

const { Search } = Input
function Home () {
  const navigate = useNavigate()
  const onFocus = () => {
    navigate('/search')
  }
  const [all, setAll] = useState([])
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/toplist/detail ')
      setAll(res.list.slice(0, 4))
      console.log(res.list.slice(0, 4))
    }
    loadList()
  }, [])
  //push跳转 以params参数为例，navigate默认开启push模式
  const pushShow = (id) => {
    let ids = id.toString()
    console.log(ids)
    navigate(`/track?id=${ids}`)
  }
  return (
    <>
      <div className="nav">
        <h2>网易云音乐</h2>
        <Search
          placeholder="搜索歌曲"
          allowClear
          onFocus={onFocus}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className='paihang'>
        {all.map(item => (
          <div className='paihang-item' key={uuidv4()} onClick={() => pushShow(item.id)}>
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