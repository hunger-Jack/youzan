/**
 * 使用promise统一接口，统一不同状态码需要做的事情
 */
import url from 'js/api.js'
import axios from 'axios'

function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then((res) => {
      let status = res.data.status
      if (status === 200) {
        resolve(res)
      }
      reject(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export default fetch
