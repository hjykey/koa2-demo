// npm install mongoose --save
//引入connect
const { connect, initSchemas } = require('./init.js') //立即执行函数
const mongoose = require('mongoose')
;(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({ userName: 'jspang', password: '123456' })
  var Addusers = new Array()
  Addusers.push(oneUser)
  Addusers.push(new User({ userName: 'admin', password: 'admin' }))
  User.insertMany(Addusers, function (err) {
    console.log(err)
  })
  // oneUser
  //   .save()
  //   .then(() => {
  //     console.log('插入成功')
  //   })
  //   .catch((reject) => {
  //     console.log('插入失败：' + reject)
  //   })
  let users = await User.findOne({}).exec()
  console.log(users)
})()
