import Vue from 'vue'
import axios from 'axios'
import vultr from 'src/request/vultr'

Vue.prototype.$axios = axios
Vue.prototype.ajax = {
    vultr,
}
