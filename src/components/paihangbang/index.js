import { useEffect } from "react"
import { http } from '../../utils/http'



function Phb (id) {
  useEffect(() => {
    const loadList = async () => {

      const res = await http.get(`/playlist/detail?id=${id}`)
      console.log(res)
    }
    loadList()
  }, [])
  return (
    <>

    </>
  )
}

export default Phb