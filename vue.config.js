/*
 * Copyright (c) 2021 成都快一点技术有限公司 All rights reserved
 * @Author: 陈智
 * @Date: 2021-05-24 15:43:19
 * @LastEditTime: 2021-05-24 16:21:57
 */
module.exports = {
    devServer:{
        host:'127.0.0.1',
        port:8081,
        https:false,
        proxy:{
            '/api': { // 访问路径，如‘dev-api’
                target: `http://api.repeater.vip`, // 目标服务器ip和端口
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/' // 目标路径
                }
              }
        }

    }
}