
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true}))

app.listen(3000,function(){
  console.log('Server esta funcionando!')
})
app.set('view engine','ejs')
app.get ('/',(req,res) => {
  res.render('index.ejs')
app.post('/show',(req,res)=> {
  console.log(req.body)
})

})
