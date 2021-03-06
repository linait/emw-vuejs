// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { baseUrl } from './env'

axios.interceptors.request.use(config => {
    store.dispatch("global/gProgress", 0)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    store.dispatch("global/gProgress", 100)
    if (response && (response.status === 200 || response.status === 304)) {
        return response
    }
    return {
        data: {
            status: -1,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    if (res.data.status !== 200) {
        alert('服务器请求失败！');
        store.commit("global/logout")
        window.location.href = "/"
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: baseUrl + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: baseUrl + url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}
