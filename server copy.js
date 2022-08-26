const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("express");
const { request } = require("express");
const encoder = bodyParser.urlencoded({extended:true});

var cust_id;

const app = express();
app.use(express.static('public')); //setup static public directory

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cantin"
});

connection.connect(function(error){
  if(error) throw error
  else console.log("Connected successfully");
});

app.get("/",function(req,res){
  res.render('frontpage.ejs'); 
});

app.post("/login", encoder, function(req,res){
  var password = req.body.password;
  var username = req.body.email;
  var userType = req.body.userType;
  //console.log(userType);
  var query='';
  if(userType=='user'){
    query = "select * from customer where email=? and password=?";
  }
  else{
    query = "select * from restaurant where email=? and password=?";
  }
  connection.query(query,[username,password], function(error,results,fields){
    if(results.length > 0){
      var cust_id = results[0].cust_id;
      res.redirect("/restaurants");
    }
    else{
      res.redirect("/login");
    }
    res.end();
  });
});

app.get('/restaurants', function(req, res) {
  var query="select rest_id,rest_name,phone_no,image_url,status from restaurant";
  connection.query(query, function(error,results,fields){
    console.log(results);
    res.render('restaurants.ejs',{results});
});
});

app.get('/restaurants/:id', function(req, res) {
  console.log(req.params.id);
  var query="select food_id,name,price,inventory_count,image from food where rest_id ="+req.params.id;
  connection.query(query, function(error,results,fields){
    console.log(results);
    res.render('foods.ejs',{results});
});
});

app.get('/cart', function(req, res) {
  res.render('cart.ejs');
});

app.get('/login', function(req, res) {
  res.render('login.ejs');
});

app.get('/create-account-user', function(req, res) {
  res.render('create-account-user.ejs');
});

app.post("/create-account-user", encoder, function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var phone_no = req.body.phoneNo;
  var password = req.body.psw;
  var query = `insert into customer (fname, lname, phone_no, email, password) values(?,?,?,?,?)`;
  connection.query(query,[fname,lname,phone_no,email,password], function(error,results,fields){
    if (error) throw error;
    else {
      console.log(results);
      res.redirect('/login');}
  });
});

app.get('/create-account-rest', function(req, res) {
  res.render('create-account-rest.ejs');
});

app.post("/create-account-rest", encoder, function(req,res){
  var rname = req.body.rname;
  var email = req.body.email;
  var phone_no = req.body.phoneNo;
  var password = req.body.psw;
  var authid = req.body.aId;
  var query = `insert into restaurant (rest_name, email, password, auth_id, phone_no) values(?,?,?,?,?)`;
  connection.query(query,[rname,email,password,authid,phone_no], function(error,results,fields){  
    if (error) throw error;
    else res.redirect('/login');
  });
});

app.post("/placemyorder", bodyParser.json() , function(req,res){
  console.log("recieved:data")
  console.log(req.body)
var total = 0;
var quantity = 0;
for(var i = 0 ; i < req.body.length ; i++)
{
  var price = parseFloat((req.body[i]['price']).replace('₹', ''));
  var quantity = parseInt(req.body[i]['quantity']);
  total = total + (price * quantity);
}
total = Math.round(total*100)/100;
var order_no = 1;
var query = 'select order_no from orders_list';
connection.query(query, function(error,results,fields){
  if (error) throw error;
  else if(results.length > 0){
    console.log(results[results.length-1].order_no);
    order_no = Math.max(parseInt(results[results.length-1].order_no)+1,order_no);
    console.log("order_no is :"+order_no);
  }
});
var order_id,rest_id;
var query = 'select rest_id from food where food_id=?';
connection.query(query,[req.body[0].foodId],function(error,results,fields){
  if (error) throw error;
  else if(results.length > 0){
    rest_id = results[0].rest_id;
    console.log("I got my rest id as: "+rest_id);
  }
});

var query = 'insert into orders_list (order_no, status, total_amt, date_time) values(?,?,?,CURRENT_TIMESTAMP)';
  connection.query(query,[order_no,"TRANSACT NA",total], function(error,results,fields){  
    if (error) throw error;
    else{
      order_id=results[0].insertId;
      console.log("I got my order id: "+order_id);
    }
  });
  console.log("my rest id, cust id, order id are"+rest_id+" "+" "+cust_id+" "+order_id);
  var query = 'insert into orders (order_id,cust_id,rest_id) values(?,?,?)';
  connection.query(query,[order_id,rest_id,cust_id], function(error,results,fields){  
    if (error) throw error;
  });

  var jsondata = req.body;
  var values = [];
  for(var i=0; i< jsondata.length; i++)
    values.push([order_id,jsondata[i].foodId,jsondata[i].qty]);
  var query = `insert into orders_details (order_id, food_id, qty) values(?,?,?)`;
  connection.query(query,values, function(error,results,fields){  
    if (error) throw error;
    else{
      res.redirect("/transact");
    }
  });

});

app.get("/transact", function(req, res) {
  res.render('transact.ejs');
});
app.listen(4500);