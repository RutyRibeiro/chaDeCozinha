const express =require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.get('/', (request, response)=>{
    response.send('Ok')

})



app.listen(3000, ()=>{console.log('server running! port: 3000')})

