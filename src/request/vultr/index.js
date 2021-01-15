import axios from 'axios'
import Request from 'src/request'

const vultrAxios = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer C6NCOMZP7TRGHKS7LJQVPTD6BGSGACS6JLDA'
    }
})

const callback = (obj, res) => {
    const status = 200 <= res.status && res.status
    if (status && obj.success) obj.success(res.data)
    if (!status && obj.error) obj.error(res)
    if (obj.finish) obj.finish()
}

vultrAxios.interceptors.request.use(request => {
    return request
}, error => Promise.reject(error))

vultrAxios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default new Request(vultrAxios, callback)