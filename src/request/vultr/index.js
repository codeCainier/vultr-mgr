import axios from 'axios'
import Request from 'src/request'

const vultrAxios = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer C6NCOMZP7TRGHKS7LJQVPTD6BGSGACS6JLDA'
    }
})

vultrAxios.interceptors.request.use(request => {
    return request
}, error => Promise.reject(error))

vultrAxios.interceptors.response.use(response => {
    return response
}, error => {
    // if (error.response.status !== 200) alert(error.response.data.error)
    return Promise.reject(error)
})

export default new Request(vultrAxios)