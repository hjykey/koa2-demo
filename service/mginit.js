const mongoose = require('mongoose')
// 连接数据库，URL以mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。（默认端口27017）
// 连接mongodb数据库的链接解析器会在未来移除，要使用新的解析器，通过配置{ useNewUrlParser:true }来连接 ；其他警告参考：https://mongoosejs.com/docs/deprecations.html
const db = 'mongodb://localhost/test_Db'
const { resolve } = require('path')
// npm install glob --save
const glob = require('glob')
mongoose.Promise = global.Promise // 防止Mongoose: mpromise 错误
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require) //引入所有Schema文件
}

exports.connect = () => {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)

  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    //连接数据库
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

    //增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    //数据库出现错误的时候
    mongoose.connection.on('error', (err) => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    //链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
