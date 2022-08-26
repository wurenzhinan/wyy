import {
  HomeOutlined,
  LeftOutlined
} from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function Go () {
  const navigate = useNavigate()
  //前进
  const backWard = () => {
    navigate(-1)
  }
  const goHome = () => {
    navigate('/')
  }
  return (
    <span className='go'>
      <LeftOutlined onClick={backWard} style={{ paddingLeft: '1.8604166666666667vw', paddingRight: '1.518518518518516vh' }} />|
      <HomeOutlined onClick={goHome} style={{ paddingLeft: '4vw' }} />
    </span>
  )
}

export default Go