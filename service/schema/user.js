const mongoose = require('mongoose') //引入Mongoose
const bcrypt = require('bcrypt') // npm instal --save bcrypt
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型
// Schema中的数据类型
// String ：字符串类型
// Number ：数字类型
// Date ： 日期类型
// Boolean： 布尔类型
// Buffer ： NodeJS buffer 类型
// ObjectID ： 主键,一种特殊而且非常重要的类型
// Mixed ：混合类型
// Array ：集合类型
//创建我们的用户Schema,用来定义表的模版，实现和MongoDB数据库的映射。model ：具备某张表操作能力的一个集合；entity ：类似记录，由Model创建的实体，也具有影响数据库的操作能力
const userSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String, required: true },
  password: String,
  meta: {
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() },
  },
})
//增加一个自定义的方法
// userSchema.methods.add = () => console.log('add a new record!')
//多个方法可用UserShema.methods ={{}，{}}
// UserShema.methods = {
//   //判断密码正确与否,返回promise对象
//   comparePassword: (_password, password) => {
//     return new Promise((resolve, reject) => {
//       bcrypt.compare(_password, password, (err, isMatch) => {
//         if (!err) {
//           resolve(isMatch)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },
//   //判断登录次数,大于最大次数则锁住一段时间,返回promise对象
//   incLoginAttepts: (user) => {
//     return new Promise((resolve, reject) => {
//       if (this.lockUntil && this.lockUntil < Date.now()) {
//         this.update(
//           {
//             //$set,原子操作,设置某一个字段的值。$inc	对一个数字字段的某个field增加value $rename	字段的重命名
//             $set: {
//               loginAttepts: 1,
//             },
//             //unset原子操作,删除字段。
//             $unset: {
//               lockUntil: 1,
//             },
//           },
//           (err) => {
//             if (!err) resolve(true)
//             else reject(err)
//           }
//         )
//       } else {
//         let updates = {
//           $inc: {
//             loginAttepts: 1,
//           },
//         }
//         if (loginAttepts + 1 > MAX_LOGIN_ATTEMPTS && !this.isLocked) {
//           updates.$set = {
//             lockUntil: Date.now() + LOCK_TIME,
//           }
//         }
//         //将上面两个原子操作注册
//         this.update(updates, (err) => {
//           if (!err) resolve(true)
//           else reject(err)
//         })
//       }
//     })
//   },
// }

//在save之前给密码加盐,把加盐之后的密码存到数据库
userSchema.pre('save', function (next) {
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

//虚拟字段,virtual是document的属性 你可以get,set他们但是不持续化到MongoDB. virtual属性get非常有用可以格式化或者合并字段,  set可以分解一个字段到多个字段并持续化到数据库
//此处虚拟了一个islocked的属性，该属性不会写入mongodb
userSchema.virtual('isLocked').get(() => {
  return true
})

//发布模型
mongoose.model('User', userSchema)
