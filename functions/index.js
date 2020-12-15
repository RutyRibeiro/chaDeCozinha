const functions = require("firebase-functions");
const mysql = require("./mysql").pool;
const express = require("express");
const cors = require("cors");
const app = express();
const validate = require("./utils").validate;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.connection.remoteAddress);
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: "teste" });
    conn.query(
      "SELECT * FROM produtos",
      (error, resultado, fields) => {
        if (error) return res.status(500).send({ error });
        res.status(200).send(resultado);
      }
    );
    conn.end;
  });
});

app.post("/cadastro", (request, response) => {
  const nome = request.body.nome;
  const telefone = request.body.telefone;
  const senha = request.body.senha;

  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ erro: error });
    }
    conn.query(
      `insert into usuarios (nome, telefone, senha) values("${nome}","${telefone}","${senha}" )`,
      (error) => {
        if (error) {
          return response.status(500).send({ erro: error });
        }
        return response.status(200).send("Usuário cadastrado");
      }
    );
    conn.end;
  });
});

app.post("/login", (req, res) => {
  const response = validate(req.body);
  

  if (response.status == "erro") {
    const status = response.status;
    const message = response.message;
    return res.status(400).send({ status, message });
  }
  const {
    status,
    message,
    user: { telefone, senha },
  } = response;
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ erro: error });
    }
    conn.query(
      `select id,senha,nome from usuarios where telefone='${telefone}'`,
      (error, result) => {
        console.log(result)
        if (error) {
          return res.status(500).send({ erro: error });
        }
        if (result == ''){
            return res.status(200).send({"erro":"Usuário inexistente"})
        }
        if (result[0].senha != senha){
            return res.status(200).send({"erro":"Senha incorreta"})
        }
        const id = result[0].id
        const nome = result[0].nome
        return res.status(200).send({id, nome})
      }
    );
    conn.end;
    
  });
});
exports.app = functions.https.onRequest(app);
