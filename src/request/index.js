class Request {
    constructor (axios, callback) {
        this.axios = axios
        this.callback = callback
    }

    get(obj) {
        this.axios.get(obj.url, { params: obj.params })
            .then(res => this.callback(obj, res))
            .catch(res => this.callback(obj, res))
    }

    post(obj) {
        this.axios.post(obj.url, obj.params)
            .then(res => this.callback(obj, res))
            .catch(res => this.callback(obj, res))
    }

    delete(obj) {
        this.axios.delete(obj.url, { data: obj.params })
            .then(res => this.callback(obj, res))
            .catch(res => this.callback(obj, res))
    }

    put(obj) {
        this.axios.put(obj.url, obj.params)
            .then(res => this.callback(obj, res))
            .catch(res => this.callback(obj, res))
    }
}

// 请求封装
export default Request