const functions = require("firebase-functions");
const mysql = require("./mysql").pool;
const express = require("express");
const cors = require("cors");
const app = express();
const validate = require("./utils").validate;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  
  mysql.getConnection((error, conn) => {
    if (error) return res.status(200).send({ error: "teste" });
    conn.query("SELECT * FROM produtos", (error, resultado, fields) => {
      if (error) return res.status(200).send({ error });
      res.status(200).send(resultado);
    });
    conn.release();
  });
});

app.post("/cadastro", (request, response) => {
  const nome = request.body.nome;
  const telefone = request.body.telefone;
  const senha = request.body.senha;

  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error);
      return response.status(200).send({ erro: error });
    }
    conn.query(
      `insert into usuarios (nome, telefone, senha) values("${nome}","${telefone}","${senha}" )`,
      (error) => {
        if (error) {
          if (error.errno == 1062) {
            return response
              .status(200)
              .send({ erro: "Usuário já cadastrado com este telefone" });
          }
          return response.status(200).send({ erro: error.sqlMessage });
        }
        return response.status(200).send("Usuário cadastrado");
      }
    );
    conn.release();
  });
});

app.post("/login", (req, res) => {
  const response = validate(req.body);

  if (response.status == "erro") {
    const status = response.status;
    const message = response.message;
    return res.status(200).send({ status, message});
  }
  const {
    status,
    message,
    user: { telefone, senha },
  } = response;
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(200).send({ erro: error });
    }
    conn.query(
      `select id,senha,nome from usuarios where telefone='${telefone}'`,
      (error, result) => {
        console.log(result);
        if (error) {
          return res.status(200).send({ erro: error });
        }
        if (result == "") {
          return res.status(200).send({ erro: "Usuário inexistente" });
        }
        if (result[0].senha != senha) {
          return res.status(200).send({ erro: "Senha incorreta" });
        }
        const id = result[0].id;
        const nome = result[0].nome;
        return res.status(200).send({ id, nome });
      }
    );
    conn.release();
  });
});

app.post("/escolher", (req, res) => {
  const idUsuario = req.body.idUsuario;
  const idProduto = req.body.idProduto;

  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error);
      return res.status(200).send({ erro: error });
    }
    conn.query(
      `select comprado from produtos where id_produto = ${idProduto}`,
      (error, result) => {
        if (error) {
          return res.status(200).send({ erro: error.sqlMessage });
        }
        if (result[0].comprado == 1) {
          
          return res
            .status(200)
            .send({
              erro:
                "Não foi possível escolher este produto pois já foi escolhido por outro usuário",
            });
        }
        conn.query(
          `select count(*) as soma from usuario_produto where id_usuario = ${idUsuario}`,
          (error, result) => {
            if (error) {
              return res.status(200).send({ erro: error.sqlMessage });
            }
            if (result[0].soma >= "2") {
              
              return res
                .status(200)
                .send({
                  erro:
                    "Você não pode escolher mais produtos, caso queira selecionar este, exclua alguma da sua lista ",
                });
            }
            conn.query(
              `insert into usuario_produto (id_usuario,id_produto) values ("${idUsuario}","${idProduto}")`,
              (error) => {
                if (error) {
                  return res.status(200).send({ erro: error.sqlMessage });
                }
                conn.query(
                  `update produtos set comprado = true where id_produto = ${idProduto}`,
                  (error) => {
                    if (error) {
                      return res.status(200).send({ erro: error.sqlMessage });
                    }
                    return res.status(200).send("Produto Escolhido");
                  }
                );
              }
            );
          }
        );
      }
    );

    conn.release();
  });
});

app.post("/meusPedidos", (req, res) => {
  const id=req.body.idUsuario

  mysql.getConnection((error, conn) => {
    if (error) return res.status(200).send({ error: error});
    
    conn.query(`select * from produtos inner join usuario_produto on produtos.id_produto = usuario_produto.id_produto where id_usuario=${id};`, (error, resultado) => {
      
      if (error) return res.status(200).send({ error });
      return res.status(200).send(resultado);

    });
    conn.release();
  });
});

app.post("/cancelar", (req,res )=>{
  const id = req.body.idProduto
  
  mysql.getConnection((error, conn)=>{
    if (error) return res.status(200).send({ error: error});

    conn.query(`delete from usuario_produto where id_produto=${id};`, (error) => {
      
      if (error) return res.status(200).send({ error });
      
      conn.query(`update produtos set comprado=false where id_produto=${id};`, (error) => {
      
        if (error) return res.status(200).send({ error });
        return res.status(200).send('Pedido Cancelado')
      });

    });
    conn.release();

    
  })

})

exports.app = functions.https.onRequest(app);
