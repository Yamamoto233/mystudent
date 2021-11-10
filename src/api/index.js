/*
 * Copyright (c) 2021 成都快一点技术有限公司 All rights reserved
 * @Author: 陈智
 * @Date: 2020-05-20 11:28:50
 * @LastEditTime: 2021-05-24 16:18:50
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = '/api'


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
export const nicePic = params => get('/cos-img/',params)