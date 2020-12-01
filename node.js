const { log } = require('console')
const fs = require('fs')
fs.readFile('./lista.json', function (err, data) {
    if (err) return (console.log(`Aconteceu um erro ${err}`))
    conteudo = JSON.parse(data)


    conteudo["lista"].map(function (obj) {
        console.log(`Nome do produto ${obj.nome_produto}`);
        console.log(`img do produto ${obj.img_produto}`);
        console.log(`descricao do produto ${obj.descricao}\n`);
    })
})

