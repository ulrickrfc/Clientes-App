const express = require('express');
const app = express();

const data = require("./data.json")

app.use(express.json())

const methodOverride = require('method-override')


app.get("/", (req,res) => {
  res.json(data)
})

app.get("/", (req,res) => {
  res.json(data)
})
app.post("/", (req,res) => {
  let cliente = req.body
  data.push(cliente)

  res.send("O novo cliente foi adicionado!")
})

app.delete("/:id", (req,res) => {

  let cpf_cnpj = req.params.id

  const cliente = data.findIndex(cli => cli.cpf_cnpj == cpf_cnpj)
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