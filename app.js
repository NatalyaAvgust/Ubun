const mysql = require("mysql2");
const express = require("express");
const expressHbs=require("express-handlebars");
const hbs=require("hbs");

const app = express();
app.engine("hbs", expressHbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname:"hbs"
  }));
const urlencodedParser = express.urlencoded({extended: false});
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "lolka",
    database: "buh",
    password: "Q1qqqq",
    dateStrings: true
  });
  app.set("view engine", "hbs");

  app.get("/index", function(req, res){
    pool.query("SELECT * FROM kadr", function(err, data) {
      if(err) return console.log(err);
      res.render("index.hbs", {
          kadr: data
      });
    });
});


// возвращаем форму для добавления данных
app.get("/create", function(req, res){
    res.render("create.hbs");
});
// получаем отправленные данные и добавляем их в БД 
app.post("/create", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const fam = req.body.fam;
    const name = req.body.name;
    const daterj = req.body.daterj;
    const oklad= req.body.oklad;
    const daterab = req.body.daterab;
    pool.query("INSERT INTO kadr (fam, name, daterj, oklad, daterab) VALUES (?,?,?,?,?)", [fam, name, daterj, oklad, daterab], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/index");
    });
});
 
// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM kadr WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
     res.render("edit.hbs", {
        user: data[0]
    });
  });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/edit", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
  const fam = req.body.fam;
    const name = req.body.name;
    const daterj = req.body.daterj;
    const oklad= req.body.oklad;
    const daterab = req.body.daterab;
  const id = req.body.id;
   
  pool.query("UPDATE kadr SET fam=?, name=?, daterj=?, oklad=?, daterab=? WHERE id=?", [fam, name, daterj, oklad, daterab, id], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/index");
  });
});
 
// получаем id удаляемого пользователя и удаляем его из бд
app.post("/delete/:id", function(req, res){
          
  const id = req.params.id;
  pool.query("DELETE FROM kadr WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/index");
  });
});


app.get("/indexx", function(req, res){
  pool.query("SELECT * FROM zarp", function(err, data) {
    if(err) return console.log(err);
    res.render("indexx.hbs", {
        zarp: data
    });
  });
});


// возвращаем форму для добавления данных
app.get("/createe", function(req, res){
  res.render("createe.hbs");
});
// получаем отправленные данные и добавляем их в БД 
app.post("/createe", urlencodedParser, function (req, res) {
       
  if(!req.body) return res.sendStatus(400);
  const fam = req.body.fam;
  const prem = req.body.prem;
  const nach = req.body.nach;
  const uder= req.body.uder;
  const itog = req.body.itog;
  pool.query("INSERT INTO zarp (fam, prem,nach,uder,itog) VALUES (?,?,?,?,?)", [fam, prem,nach,uder,itog], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/indexx");
  });
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/editt/:id", function(req, res){
const id = req.params.id;
pool.query("SELECT * FROM zarp WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
   res.render("editt.hbs", {
      user: data[0]
  });
});
});
// получаем отредактированные данные и отправляем их в БД
app.post("/editt", urlencodedParser, function (req, res) {
       
if(!req.body) return res.sendStatus(400);
const fam = req.body.fam;
 const prem = req.body.prem;
  const nach = req.body.nach;
  const uder= req.body.uder;
  const itog = req.body.itog;
const id = req.body.id;
 
pool.query("UPDATE zarp SET fam=?, prem=?, nach=?, uder=?, itog=? WHERE id=?", [fam, prem,nach,uder,itog], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/indexx");
});
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/deletee/:id", function(req, res){
        
const id = req.params.id;
pool.query("DELETE FROM zarp WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/indexx");
});
});


app.use('/spec',function(_,response){
  response.render("spec.hbs");
});

app.use('/contact',function(_,response){
    response.render("contact.hbs");
  });

app.use('/',function(_,response){
  response.render("home.hbs");
});

app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});