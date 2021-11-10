/**
 * 新闻管理模块
 * create by XDC
 * */

const express = require('express')
const router = express.Router()
const conn = require('./conn')

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

router.post('/newspublish', (req, res) => {
  let { title, author, source, content } = req.body

  if (!(title && author && source && content)) {
    res.send('注意传参数哦!参数错误')
    return
  }

  const sql = `insert into article(title, author, source, content) values("${title}", "${author}", "${source}", "${content}")`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      res.send({
        errCode: 0,
        msg: '发布新闻成功!',
      })
    } else {
      res.send({
        errCode: 1,
        msg: '发布新闻失败!',
      })
    }
  })
})

router.get('/newslist', (req, res) => {
  let { currentPage, pageSize } = req.query

  if (!(currentPage && pageSize)) {
    res.send('注意传参数哦!参数错误')
    return
  }

  let sql = `select * from article order by id asc`
  let total
  conn.query(sql, (err, data) => {
    if (err) throw err
    total = data.length
  })

  let n = (currentPage - 1) * pageSize
  sql += ` limit ${n}, ${pageSize}`

  conn.query(sql, (err, data) => {
    if (err) throw err
    res.send({
      total,
      data,
    })
  })
})

router.get('/newsdel', (req, res) => {
  let { id } = req.query

  if (!id) {
    res.send('注意传参数哦!参数错误')
    return
  }

  const sql = `delete from article where id=${id}`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      res.send({
        errCode: 0,
        msg: '删除新闻成功',
      })
    } else {
      res.send({
        errCode: 1,
        msg: '删除新闻失败',
      })
    }
  })
})

router.get('/newsalldel', (req, res) => {
  let { id } = req.query

  if (!id) {
    res.send('注意传参数哦!参数错误')
    return
  }
  let str = '('
  for (const val of id) {
    str += val
  }
  str = str + ')'
  const sql = `delete from article where id in ${str}`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      res.send({
        errCode: 0,
        msg: '批量删除新闻成功',
      })
    } else {
      res.send({
        errCode: 1,
        msg: '批量删除新闻失败',
      })
    }
  })
})

router.get('/newsdetail', (req, res) => {
  let { id } = req.query

  if (!id) {
    res.send('注意传参数哦!参数错误')
    return
  }

  const sql = `select * from article where id=${id}`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data) {
      res.send({
        errCode: 0,
        data: data[0],
      })
    }
  })
})

router.get('/newsedit', (req, res) => {
  let { id } = req.query

  if (!id) {
    res.send('注意传参数哦!参数错误')
    return
  }

  const sql = `select * from article where id=${id}`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data) {
      res.send({
        errCode: 0,
        data: data[0],
      })
    }
  })
})

router.post('/newssaveedit', (req, res) => {
  let { title, author, source, content, id } = req.body

  if (!(title && author && source && content && id)) {
    res.send('注意传参数哦!参数错误')
    return
  }
  const sql = `update article set title="${title}", author="${author}", source="${source}", content="${content}" where id=${id}`
  conn.query(sql, (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      res.send({
        errCode: 0,
        msg: '修改新闻成功',
      })
    } else {
      res.send({
        errCode: 0,
        msg: '修改新闻失败!',
      })
    }
  })
})

module.exports = router
