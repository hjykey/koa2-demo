const Koa = require('koa')
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile(
    require('path').resolve(__dirname, '../../static/newGoods.json'),
    'utf8',
    (err, data) => {
      data = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      data.map((value, index) => {
        // console.log(value)
        let newGoods = new Goods(value)
        newGoods
          .save()
          .then(() => {
            saveCount++
            //console.log('成功' + saveCount)
          })
          .catch((error) => {
            // console.log('失败：' + error)
          })
      })
    }
  )
  ctx.body = '导入商品数据'
})
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile(
    require('path').resolve(__dirname, '../../static/category_sub.json'),
    'utf8',
    (err, data) => {
      data = JSON.parse(data)
      let saveCount = 0
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((value, index) => {
        console.log(value)
        let newCategorySub = new CategorySub(value)
        newCategorySub
          .save()
          .then(() => {
            saveCount++
            console.log('成功插入' + saveCount)
          })
          .catch((error) => {
            console.log('插入失败:' + error)
          })
      })
    }
  )
  ctx.body = '开始导入数据'
})
module.exports = router
