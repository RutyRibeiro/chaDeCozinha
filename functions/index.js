const functions = require('firebase-functions');
const mysql = require('./mysql').pool
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    console.log(req.connection.remoteAddress)
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: 'teste' })
        conn.query('SELECT * FROM produtos', (error, resultado, fields) => {
            if (error) return res.status(500).send({ error })
            res.status(200).send(resultado)
        })

    })

})

app.post('/', (request, response) => {
    const nome = request.body.nome
    const telefone = request.body.telefone
    const senha = request.body.senha

    mysql.getConnection((error, conn) => {
        if (error) {
            return response.status(500).send({ "erro": error })
        }
        conn.query(`insert into usuarios (nome, telefone, senha) values("${nome}","${telefone}","${senha}" )`, (error, result) => {
            if (error) {
                return response.status(500).send({ "erro": error })
            }
            return response.status(200).send("Usuário cadastrado")
        }
        )
    })

})

exports.app = functions.https.onRequest(app);


