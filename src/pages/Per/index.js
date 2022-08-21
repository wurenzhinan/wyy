import { useEffect } from "react"
import { http } from "../../utils/http"




function Per (id) {
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get(`/related/playlist?id=${id}`)
      console.log(res)
    }
    loadList()
  }, [])
}

export default Per