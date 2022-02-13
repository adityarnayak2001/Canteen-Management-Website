const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("express");
const { request } = require("express");
const encoder = bodyParser.urlencoded({extended:true});

var cust_id,rest_id;

const app = express();
app.use(express.static('public')); //setup static public directory

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cantin"
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    connection.query(query,[username,password], function(error,results,fields){
      if(results.length > 0){
        cust_id = results[0].CUST_ID;
      console.log("My customer id: "+cust_id);
        res.redirect("/restaurants");
      }
      else{
        res.redirect("/login");
      }
      res.end();
    });
  }
  else{
    query = "select * from restaurant where email=? and password=?";
    connection.query(query,[username,password], function(error,results,fields){
      if(results.length > 0){
        console.log(results);
        rest_id = results[0].REST_ID;
        res.redirect("/restaurant_orders");
      }
      else{
        res.redirect("/login");
      }
      res.end();
    });
  }
  
});

app.get('/restaurant_orders', function(req, res) {
  var list1 = [];
  var list2 = [];
  var data = [];
  var query = 
  `select orders_list.ORDER_ID,orders_list.order_no,orders_list.total_amt,orders_list.status,customer.fname,customer.lname
  from orders,orders_list,restaurant,customer where orders_list.order_id = orders.order_id and orders.rest_id = restaurant.rest_id
  and orders.CUST_ID=customer.CUST_ID and restaurant.REST_ID = ? ORDER BY orders_list.ORDER_ID`;
  connection.query(query,[rest_id],async function(error,results,fields){  
    await sleep(3000);
    list1.push(results);
    data.push(list1);
    if (error) throw error;
    else{
      var query = `select orders_list.ORDER_ID from orders_list,orders
       where orders_list.ORDER_ID=orders.ORDER_ID and orders.rest_id=?;`
       connection.query(query,[rest_id],async function(error,results,fields){  
        if (error) throw error;
        else{
          for(var i=0;i<results.length;i++){
            var query = `select order_details.order_id,food.name,order_details.QTY from food,order_details 
            where order_details.FOOD_ID=food.FOOD_ID and order_details.ORDER_ID = ? order by order_details.ORDER_ID;`
            connection.query(query,[results[i].ORDER_ID], async function(error,results,fields){  
              if (error) throw error;
              else{
                list2.push(results);
              }
            });
        }
        await sleep(3000);
        data.push(list2);
        console.log(list2);
        for(var j=0; j < data[0][0].length; j++) { 
            console.log(data[0][0][j]);
          }
        }
        res.render('rest_orders.ejs',{data});
      });
    }
  });
});

app.get('/restaurants', function(req, res) {
  var query="select rest_id,rest_name,phone_no,image_url,status from restaurant";
  connection.query(query, function(error,results,fields){
    res.render('restaurants.ejs',{results});
});
});

app.get('/restaurants/:id', function(req, res) {
  console.log(req.params.id);
  var query="select food_id,name,price,inventory_count,image from food where rest_id ="+req.params.id;
  connection.query(query, function(error,results,fields){
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
  connection.query(query,[rname,email,password,authid,phone_no],function(error,results,fields){  
    if (error) throw error;
    else res.redirect('/login');
  });
});

 app.post("/placemyorder", bodyParser.json() , async  function(req,res){
  console.log("recieved:data and my customer id:"+cust_id);
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
var query = 'select max(order_no) from orders_list';
connection.query(query, async function(error,results,fields){
  if (error) throw error;
  else if(results.length > 0){
    console.log(results[0]);
    order_no = parseInt(results[0]['max(order_no)'])+1;
    console.log("order_no is :"+order_no);
    await sleep(3000);
  }
});
var order_id,rest_id;
var query = 'select rest_id from food where food_id=?';
connection.query(query,[req.body[0].foodId],async function(error,results,fields){
  if (error) throw error;
  else if(results.length > 0){
    rest_id = results[0].rest_id;
    console.log("I got my rest id as: "+rest_id);
  }
});

var query = 'insert into orders_list (order_no, status, total_amt, date_time) values(?,?,?,CURRENT_TIMESTAMP)';
  connection.query(query,[order_no,"TRANSACT NA",total],async function(error,results,fields){  
    if (error) throw error;
    else{
      order_id=results.insertId;
      console.log("my rest id, cust id, order id are"+rest_id+" "+" "+cust_id+" "+order_id);

      query = 'insert into orders (order_id,cust_id,rest_id) values(?,?,?)';
      connection.query(query,[order_id,cust_id,rest_id],async function(error,results,fields){  
          if (error) throw error;
      });

      var jsondata = req.body;
      var values = [];
  for(var i=0; i< jsondata.length; i++){
    values.push([order_id,parseInt(jsondata[i].foodId),parseInt(jsondata[i].quantity)]);
  
  var query = `insert into order_details (order_id, food_id, qty) values ?`;
  connection.query(query,[values], function(error,results,fields){  
    if (error) throw error;
  });
  values.pop();
    }
    }
    res.send(200, { message: 'ok' });
  });
 
  



});

app.get("/my_orders",async function(req, res) {
  var list1 = [];
  var list2 = [];
  var data = [];
  var query = 
  `select orders_list.ORDER_ID,orders_list.order_no,orders_list.total_amt,orders_list.status,restaurant.rest_name
   from orders,orders_list,restaurant,customer where orders_list.order_id = orders.order_id and orders.rest_id = restaurant.rest_id
    and customer.cust_id=? and orders.CUST_ID=customer.CUST_ID ORDER BY orders_list.ORDER_ID`;
  connection.query(query,[cust_id],async function(error,results,fields){  
    await sleep(3000);
    list1.push(results);
    data.push(list1);
    if (error) throw error;
    else{
      var query = `select orders_list.ORDER_ID from orders_list,orders
       where orders_list.ORDER_ID=orders.ORDER_ID and orders.CUST_ID=?;`
       connection.query(query,[cust_id],async function(error,results,fields){  
        if (error) throw error;
        else{
          for(var i=0;i<results.length;i++){
            var query = `select order_details.order_id,food.name,order_details.QTY from food,order_details 
            where order_details.FOOD_ID=food.FOOD_ID and order_details.ORDER_ID = ? order by order_details.ORDER_ID;`
            connection.query(query,[results[i].ORDER_ID], async function(error,results,fields){  
              if (error) throw error;
              else{
                list2.push(results);
              }
            });
        }
        await sleep(3000);
        data.push(list2);

        }
        res.render('orders.ejs',{data});
      });
    }
  });
});

app.get("/order_history",async function(req, res) {
  var list1 = [];
  var list2 = [];
  var data = [];
  var query = 
  `select orders_list.ORDER_ID,orders_list.total_amt,orders_list.date_time,restaurant.rest_name
   from orders,orders_list,restaurant,customer where orders_list.order_id = orders.order_id and orders.rest_id = restaurant.rest_id
    and customer.cust_id=? and orders.CUST_ID=customer.CUST_ID ORDER BY orders_list.ORDER_ID`;
  connection.query(query,[cust_id],async function(error,results,fields){  
    await sleep(3000);
    list1.push(results);
    data.push(list1);
    if (error) throw error;
    else{
      var query = `select orders_list.ORDER_ID from orders_list,orders
       where orders_list.ORDER_ID=orders.ORDER_ID and orders.CUST_ID=?;`
       connection.query(query,[cust_id],async function(error,results,fields){  
        if (error) throw error;
        else{
          for(var i=0;i<results.length;i++){
            var query = `select order_details.order_id,food.name,order_details.QTY from food,order_details 
            where order_details.FOOD_ID=food.FOOD_ID and order_details.ORDER_ID = ? order by order_details.ORDER_ID;`
            connection.query(query,[results[i].ORDER_ID], async function(error,results,fields){  
              if (error) throw error;
              else{
                list2.push(results);
              }
            });
        }
        await sleep(3000);
        data.push(list2);
        }
        res.render('order_history.ejs',{data});
      });
    }
  });
});

app.post("/update_order_status", bodyParser.json(), function(req,res){
  var status = req.body.status;
  var order_id = req.body.order_id;
  var query = `UPDATE orders_list SET STATUS=? WHERE order_id=?`;
  connection.query(query,[status,order_id],function(error,results,fields){  
    if (error) throw error;
    else {
      res.send(200, { message: 'ok' });}
  });
});

app.get("/food_res", bodyParser.json(), function(req,res){
  var query="select food_id,name,price,inventory_count,image from food where rest_id ="+rest_id;
  connection.query(query, function(error,results,fields){
    if (error) throw error;
    else{
    res.render('rest.ejs',{results});}
});
});

app.post("/update_food_qty", bodyParser.json(), function(req,res){
  console.log("Something here");
  console.log(req.body);
  var query="UPDATE food SET INVENTORY_COUNT= ? WHERE food_id=?; ";
  for(var i=0;i<req.body.length;i++){
  connection.query(query,[req.body[i].qty,req.body[i].food_id],function(error,results,fields){
    if (error) throw error;
    else{
    }
  });
  }
  res.send(200, { message: 'ok' });
});

app.listen(4000);