
//Chamada dos pacotes:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

//config do Body-parser para usar json:
app.use(bodyParser.urlencoded({ extended: true}));


//Conexao com banco de dados e definindo porta:

const uri = "mongodb+srv://danilodmbarra:123danilo@crudm-xwvck.mongodb.net/dataretryWrites=true";
MongoClient.connect(uri,(err,client) => {
    if(err) return console.log(err)
    db = client.db('data')
    app.listen(3000, () =>{
            console.log('Server esta funcionando!')
    })
});

app.use(bodyParser.urlencoded({extended: true}))

//

app.get('/',(req,res) =>{
 res.render('index.ejs')
})
app.post('/show',(req,res) => {
  db.collection('carro').save(req.body,(err,result)=>{
    if (err) return console.log(err)
    res.redirect('/show')
      })
})
app.get('/show',(req,res)=>{
  db.collection('carro').find().toArray((err,results)=>{
    res.render('show.ejs',{data : results})
  })
})
app.get('/',(req,res) =>{
  let cursor = db.collection('carro').find()
})
//Editar-

app.route('/edit/:id').get((req, res) => {
  var id = req.params.id

  db.collection('carro').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var veiculo = req.body.veiculo
  var cor = req.body.cor

  db.collection('carro').updateOne({_id: ObjectId(id)}, {
    $set: {
      veiculo: veiculo,
      cor: cor
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})
app.route('/delete/:id')
.get((req,res)=>{
  var id = req.params.id
  db.collection('carro').deleteOne({_id: ObjectId(id)},(err,result)=>{
    if (err) return res.send(500,err)
    console.log('Deletado com sucesso')
    res.redirect('/show')
  })
})
