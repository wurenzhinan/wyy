import { useState, useEffect, useContext, useRef } from "react"
import { useLocation } from "react-router-dom"
import { http } from '../../utils/http'
import React from "react"
import './index.css'



function PerSong () {
  let picUrL = localStorage.getItem("picUrl")
  let Name = localStorage.getItem("name")
  const [recommend, setRecommend] = useState([])
  const [comment, setComment] = useState([])
  const [picUrl, setPicUrl] = useState()
  const [lyric, setLyric] = useState('')
  const [music, setMusic] = useState('')
  const [flag, setFlag] = useState(true)
  const [audioSrc, setAudioSrc] = useState("")
  const [temp, setTemp] = useState("")
  const [s, setS] = useState("")
  const realAudio = useRef(null)
  let location = useLocation()
  let queryID = location.search.slice(4)



  useEffect(() => {
    const loadList = async () => {
      const res1 = await http.get(`/simi/song?id=${queryID}`)
      const res2 = await http.get(`/comment/hot?id=${queryID}&type=0`)
      const res3 = await http.get(`/song/url?id=${queryID}`)
      const res4 = await http.get(`/lyric?id=${queryID}`)
      console.log(res3)
      console.log(res4)
      setAudioSrc(res3.data[0].url)

      console.log(realAudio)
      setLyric(res4.lrc.lyric)
      setRecommend(res1.songs)
      console.log(recommend)


    }
    loadList()
  }, [])
  useEffect(() => {
    var oLRC = {
      ms: [] //歌词数组{t:时间,c:歌词}
    }
    function createLrcObj (lrc) {
      if (lrc.length == 0) return
      var lrcs = lrc.split('\n')//用回车拆分成数组
      for (var i in lrcs) {//遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "") //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"))//取[]间的内容
        var s = t.split(":")//分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
          for (var i in oLRC) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              oLRC[i] = s[1]
            }
          }
        } else { //是数值
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g)//提取时间字段，可能有多个
          var start = 0
          for (var k in arr) {
            start += arr[k].length //计算歌词位置
          }
          var content = lrcs[i].substring(start)//获取歌词内容
          for (var k in arr) {
            var t = arr[k].substring(1, arr[k].length - 1)//取[]间的内容
            var s = t.split(":")//分离:前后文字
            oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            })
          }
        }
      }
      oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t - b.t
      })
    }

    createLrcObj(lyric)

    const lyricList = oLRC.ms  //获取歌词的行数
    realAudio.current.ontimeupdate = (e) => timeUpdata(e, lyricList)
    // console.log(lyricList)
    let currentLyc = 0
    let lycStyle = {}
    const timeUpdata = (e, lyricList) => {
      let currentTime = e.target.currentTime
      // console.log(currentTime)
      console.log(lyricList)
      for (let i = 0; i < lyricList.length; i++) {
        console.log(oLRC.ms[i + 1].t)
        if (lyricList[i + 1] && currentTime < oLRC.ms[i + 1].t && currentTime > oLRC.ms[i].t) {
          currentLyc = i
          lycStyle = {
            transform: `translateY(-${1.545 * i}rem)`,
            color: 'white'
          }
        }
      }

    }
    setS(oLRC.ms.map((item, index) => (<li key={index} style={lycStyle}>{item.c}</li>)))
  }, [])





  return (
    <>
      <audio src={audioSrc} ref={realAudio}></audio>
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
        <ul className="lyric">
          {s}
        </ul>
        <div className="recommend">
          <div className="re-header">
            <span className="re-title"></span>
            <span className="re-key">
              <img src="../../imags/播放.png" alt="" />
              <span>一键收听</span>
            </span>
          </div>
          {/* {recommend.map((item,index)=>(<div class="re-item" id={index}>
            <img class="re-item-cover" src={item.album.blurPicUrl} />
            <span class="re-item-title">{item.album.name}</span>
            <span class="re-item-pc">{artists.reduce((str, item) => `${str}${item.name}/`, '').slice(0, -1)} - ${albumName}</span>
            <i class="iconfont icon-24gl-playCircle"></i>
          </div>)
          )} */}
        </div>
      </div>


    </>
  )
}

export default PerSong

