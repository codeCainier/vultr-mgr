class Request {
    constructor (axios) {
        this.axios = axios
    }

    get(obj) {
        this.axios.get(obj.url, { params: obj.params })
            .then(res => this.callback(obj, res))
            .catch(err => {
                if (obj.error) obj.error()
                if (obj.finish) obj.finish()
            });
    }

    post(obj) {
        this.axios.post(obj.url, obj.params)
            .then(res => this.callback(obj, res))
            .catch(err => {
                if (obj.error) obj.error()
                if (obj.finish) obj.finish()
            });
    }

    delete(obj) {
        this.axios.delete(obj.url, { data: obj.params })
            .then(res => this.callback(obj, res))
            .catch(err => {
                if (obj.error) obj.error()
                if (obj.finish) obj.finish()
            });
    }

    put(obj) {
        this.axios.put(obj.url, obj.params)
            .then(res => this.callback(obj, res))
            .catch(err => {
                if (obj.error) obj.error()
                if (obj.finish) obj.finish()
            });
    }

    callback(obj, res) {
        if (res.status === 200 && obj.success) obj.success(res.data)
        if (obj.finish) obj.finish()
    }
}

// 请求封装
export default Request