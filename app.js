const express = require("express");
const bodyParser=require("body-parser");
const https = require("https");
const app= express();
const res1="";

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e2bf301a59645b85befa4385b2764eca&units=metric";
  
    https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const weatherdesc=weatherdata.weather[0].description;
        const temp=weatherdata.main.temp;
        const icon=weatherdata.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1> the "+ city +" weather is "+ weatherdesc +"</h1>");
        res.write("<h2>weather temporates is "+temp+" degress </h2>" )
        
        res.write("<img src="+imageURL+">")
        res.send();
    })
    })


})
app.listen(3000,function(){
    console.log("started server on Port 3000");
});