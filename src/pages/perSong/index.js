import { useState, useEffect, useContext, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { http } from '../../utils/http'
import React from "react"
import './index.css'



function PerSong () {
  let picUrL = localStorage.getItem("picUrl")
  let Name = localStorage.getItem("name")
  const [recommend, setRecommend] = useState([])
  const [comment, setComment] = useState([])
  const [lyric, setLyric] = useState('')
  const [flag, setFlag] = useState(true)
  const [audioSrc, setAudioSrc] = useState("")
  const [oLRC, setOlRC] = useState({
    ms: [],
  })
  const [lycStyle, setLycStyle] = useState({})
  const [currentLyc, setCurrentLyc] = useState(0)
  const realAudio = useRef(null)
  let location = useLocation()
  let queryID = location.search.slice(4)

  const timeUpdata = (e) => {
    let currentTime = e.target.currentTime
    // console.log(oLRC.ms)
    for (let i = 0; i < oLRC.ms.length; i++) {
      if (
        oLRC.ms[i + 1] &&
        currentTime < oLRC.ms[i + 1].t &&
        currentTime > oLRC.ms[i].t
      ) {
        setCurrentLyc(i)
        setLycStyle({ transform: `translateY(-${35 * i}px)` })
      }
    }
  }
  useEffect(() => {
    const loadList = async () => {
      const res1 = await http.get(`/simi/song?id=${queryID}`)
      const res2 = await http.get(`/comment/hot?id=${queryID}&type=0`)
      const res3 = await http.get(`/song/url?id=${queryID}`)
      const res4 = await http.get(`/lyric?id=${queryID}`)
      console.log(res1)
      setAudioSrc(res3.data[0].url)
      createLrcObj(res4.lrc.lyric)
      console.log(realAudio)
      setLyric(res4.lrc.lyric)
      setRecommend(res1.songs)
      setComment(res2.hotComments)


    }
    loadList()
  }, [])

  function createLrcObj (lrc) {
    let temp = {
      ms: [],
    }
    if (lrc.length == 0) return
    var lrcs = lrc.split("\n") //用回车拆分成数组
    for (var i in lrcs) {
      //遍历歌词数组
      lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "") //去除前后空格
      var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")) //取[]间的内容
      var s = t.split(":") //分离:前后文字
      if (isNaN(parseInt(s[0]))) {
        //不是数值
        for (var i in temp) {
          if (i != "ms" && i == s[0].toLowerCase()) {
            temp[i] = s[1]
          }
        }
      } else {
        //是数值
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g) //提取时间字段，可能有多个
        var start = 0
        for (var k in arr) {
          start += arr[k].length //计算歌词位置
        }
        var content = lrcs[i].substring(start) //获取歌词内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1) //取[]间的内容
          var s = t.split(":") //分离:前后文字
          temp.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content,
          })
        }
      }
    }
    temp.ms.sort(function (a, b) {
      //按时间顺序排序
      return a.t - b.t
    })
    setOlRC(temp)
  }

  useEffect(() => {
    realAudio.current.ontimeupdate = (e) => {
      timeUpdata(e)
    }
  }, [oLRC])
  //获取歌词的行数
  // console.log(lyricList)
  const s = oLRC.ms.map((item, index) => (
    <li key={index} style={currentLyc == index ? { color: "white", fontSize: "1rem" } : {}}>
      {item.c}
    </li >
  ))
  const navigate = useNavigate()
  const onEnded = () => {
    navigate(`/per?id=${recommend[0].id}`)
  }
  const toOther = (id) => {
    console.log(id)
    navigate(`/per?id=${id}`)
  }
  return (
    <>
      <audio src={audioSrc} ref={realAudio} onEnded={onEnded}></audio>
      <span className="name" >{Name}</span>
      <div className="container" >
        <img className="bg" src={picUrL} />
        <div className="bg-mask"></div>
        <div className="player">
          {flag ?
            <img src={require("../../imags/play_needle.png")} alt="" className="play-point" style={{ transform: 'rotateZ(-30deg)' }} />
            : <img src={require("../../imags/play_needle.png")} alt="" className="play-point" />
          }
          <div className="album-cover">
            <img src={picUrL} alt="" className="cover" />
            {
              flag ? <img className="pause" src={require('../../imags/播放.png')} onClick={() => { realAudio.current.play(); setFlag(false) }} />
                : <img className="pause" src={require('../../imags/暂停 (1).png')} onClick={() => { realAudio.current.pause(); setFlag(true) }} />
            }
          </div>

        </div>
        <div className="ly">
          <ul className="lyric" style={lycStyle}>
            {s}
          </ul>
        </div>

        <div className="recommend">
          <div className="re-header">
            <span className="re-title">喜欢这首歌的人也听</span>
            <span className="re-key">
              <img src={require('../../imags/播放.png')} alt="" />
              <span onClick={onEnded}>一键收听</span>
            </span>
          </div>
          <div className="re-body">
            {recommend.map((item, index) => (<div className="re-item" key={index} onClick={() => toOther(item.id)}>
              <img className="re-item-cover" src={item.album.blurPicUrl} />
              <span className="re-item-title">{item.name}</span>
              <span className="re-item-pc">{item.artists.reduce((str, item) => `${str}${item.name}/`, '').slice(0, -1)} - {item.album.name}</span>
              <img src={require('../../imags/播放.png')} alt="" className="re-bof" />
            </div>)
            )}
          </div>
        </div>
        <div className="comment">
          <div className="co-header">精彩评论</div>
          <div className="co-body">
            {comment.map((item, index) => (
              <div className="co-item" key={index}>
                <div className="user-hd">
                  <img src={item.user.avatarUrl} alt="" className="user" />
                  <span className="user-name">{item.user.nickname}</span>
                  <span className="user-time">{item.timeStr}</span>
                  <span className="user-likes">{item.likedCount}</span>
                  <img src={require('../../imags/点赞 (2).png')} alt="" className="dz" />
                </div>
                <div className="user-bd">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </>
  )
}

export default PerSong

