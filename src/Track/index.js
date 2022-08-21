import { useEffect, useState } from 'react'


function Track () {
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/playlist/track/all?id')
      console.log(res)
    }
    loadList()
  }, [])
  return (
    <>
      123
    </>
  )
}

export default Track