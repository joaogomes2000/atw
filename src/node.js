const express = require('express')
const mysql = require("mysql");
const cors = require("cors");

const app = express()

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "gereDB"
});

app.post("/login", (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    db.query("select * from contatos where email = ? and password = ?", [email, password], (err, result) =>{
        if(err){
           res.send(err)
        }
        if(result.length > 0){
            res.send(result)
        }else{
            res.send("utilizador não encontrado tente novamente");
        }
        
    })
})

app.post("/Listagem", (req, res) =>{
    db.query("select * from contatos", (err, result) =>{
        if(err){
           res.send(err)
        }
        if(result.length > 0){
            res.send(result)
        }  
    })
})

app.get("/Listagem/:id", (req, res) =>{
    const {id} = req.params;
    db.query("select * from contatos where codigo = ?",[id], (err, result) =>{
        if(err){
           console.log(err)
        }
            res.send(result)    
    })
})

app.post("/Create", (req, res) =>{
    const {nome, email, password} = req.body
    console.log(nome)
    db.query("insert into contatos (nome, email, password) values(?, ? , ?) ",[nome, email, password], (err, result) =>{
        if(err){
           console.log(err)
        }
            res.send(result)    
    })
})

app.post("/Update/:id", (req, res) =>{
    const {id} = req.params;
    const {novonome, novoemail} = req.body
    db.query("update contatos set nome = ?, email= ? where codigo = ?",[novonome, novoemail, id], (err, result) =>{
        if(err){
           console.log(err)
        }
            res.send(result)    
    })
})

app.post("/eliminar/:id", (req, res) =>{
    const {id} = req.params;

    db.query("DELETE from contatos where codigo = ? ",[id],(err, result) =>{
        if(err){
           console.log(err)
        }        
    })
})

app.listen(3001, () => {
console.log("runing on port 3001");

})

