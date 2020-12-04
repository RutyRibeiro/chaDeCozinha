const mysql = require('./mysql').pool
const express =require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/', (request, response)=>{
    const nome = request.body.nome
    const telefone = request.body.telefone
    const senha = request.body.senha

    mysql.getConnection((error, conn)=>{
        if (error){
            return response.status(500).send({"erro":error})
        }
        conn.query(`insert into usuarios (nome, telefone, senha) values("${nome}","${telefone}","${senha}" )`, (error, result)=>{
            if(error){
            return response.status(500).send({"erro":error})
            }
            return response.status(200).send("Usuário cadastrado")
        }
        )
    } )
    
})

app.listen(3000, ()=>{console.log('server running! port: 3000')})

