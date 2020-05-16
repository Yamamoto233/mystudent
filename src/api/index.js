import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8088'


const post = (url,params={}) => new Promise((resolve,reject) => {
  axios.post(url,qs.stringify(params)).then(res => resolve(res.data)).catch(err => reject(err))
})

const get = (url,params={}) => new Promise((resolve,reject) => {
  axios.get(url,{ params }).then(res => resolve(res.data)).catch(err => reject(err))
})

export const addStudent = params => post('/news/newspublish',params)
export const getList = params => get('/news/newslist',params)
export const delStudent = params => get('/news/newsdel',params)
export const getDetail = params => get('/news/newsdetail',params)
export const modifyStudent = params => post('/news/newssaveedit',params)