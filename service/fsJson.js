const fs = require('fs')
//练习fs的使用，提取json文件生成一个new json
let pushData = []

fs.readFile(
  require('path').resolve(__dirname, './appApi/goods.json'),
  'utf8',
  function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let newData = JSON.parse(data)
      let i = 0

      newData.RECORDS.map(function (value, index) {
        if (value.IMAGE1 != null) {
          i++
          // console.log(value.NAME)
          pushData.push(value)
        }
      })
      console.log(i)
      fs.writeFile(
        require('path').resolve(__dirname, './appApi/newGoods.json'),
        JSON.stringify(pushData),
        function (err) {
          if (err) console.log('写文件操作失败')
          else console.log('写文件操作成功')
        }
      )
    }
  }
)
