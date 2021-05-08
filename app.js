const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const data = []

app.use(express.json())
app.use(express.static('public')); //pega os arquivos css/script pra usar

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));

const methodOverride = require('method-override')
app.use(methodOverride("_method")) // sobescreve o metodo das rotas(get/post -> put, delete)

app.set("view engine", "njk");

nunjucks.configure("views", {
  express: app,
  autoescape: false,
  noCache:true
})


app.get("/", (req,res) =>{
  res.render("list/index", {clientes: data})
})

app.get("/new", (req,res) => {
  res.render("form/index")
})

app.post("/", (req,res) => {

  let cliente = {
    nome: req.body.nome,
    email: req.body.email,
    id: req.body.cpf_cnpj,
    cel:req.body.telefone,
    cep: req.body.cep,
    logradouro:req.body.logradouro,
    num:req.body.numero,
    bairro:req.body.bairro,
    cidade:req.body.cidade,
    estado:req.body.estado
  }

  data.push(cliente)
  res.redirect("/")
})


app.get("/delete", (req,res) => {
  res.render("delete/index")
})
app.delete("/", (req,res) => {

  let cpf_cnpj = req.body.id

  const cliente = data.findIndex(cli => cli.id == cpf_cnpj)
  if(cliente == -1){
    res.send("Cliente não encontrado!");
  } else {
    data.splice(cliente, 1)
    res.send("Cliente deletado com sucesso!")
  }

})

app.listen(process.env.PORT || 8081,function(){
  console.log("o servidor está rodando na url http://localhost:8081")
});