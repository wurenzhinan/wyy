import {
  HomeOutlined,
  LeftOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Go () {
  const navigate = useNavigate()
  //前进
  const forward = () => {
    navigate(1)
  }
  const goHome = () => {
    navigate('/')
  }
  return (
    <Space>
      <LeftOutlined onClick={forward} />
      <HomeOutlined onClick={goHome} />
    </Space>
  )
}

export default Go