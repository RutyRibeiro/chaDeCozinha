const express =require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.post('/', (request, response)=>{
    const nome = request.body.nome
    const telefone = request.body.telefone
    const senha = request.body.senha

    response.status(200).send({nome,telefone,senha})

    

})



app.listen(3000, ()=>{console.log('server running! port: 3000')})

