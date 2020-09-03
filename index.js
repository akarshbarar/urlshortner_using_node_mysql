const express = require("express")
const morgan = require("morgan");
const bodyParser = require("body-parser");
const shortid=require("shortid")

var mysql = require("mysql")

const app=express();
const port=process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('./public'));

app.use(morgan("dev")); // log every request to the console

app.use(bodyParser.urlencoded({"extended":"true"})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
 
app.listen(port,()=>{
    console.log(`magic happening at post ${port}`)
})


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newdb'
  });

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.get("/all",(req,res)=>{
    let sql = "SELECT * FROM urlshort";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
 })

app.get('/',(req,res)=>{
    res.sendFile("./index.html")
})

app.get('/:url',(req,res)=>{

    let data;
    let sql = "SELECT fullUrl FROM urlshort where shortUrl='"+req.params.url+"'";
    let query = conn.query(sql, (err, results) => {
        console.log(results)
        results.forEach(element => {
            console.log(element.fullUrl)
            data=element.fullUrl;
        });
        if(err) throw err;
        res.redirect(data)
    });
    

   
})

app.post("/shorturl",async (req,res)=>{


    let data = {
        id: 0,
        fullUrl: req.body.fullUrl,
        shortUrl:shortid.generate(),    
    };
    console.log(data)

    let sql = "INSERT INTO urlshort SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
     
    });
   console.log(req.body)
     res.redirect('/')
 });

