const express=require("express");
const app=express();
const https=require("https");
const parse=require("body-parser");
app.use(parse.urlencoded({extended:true}));



app.listen(3000,function(){
    console.log("Server started at port 3000");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/api.html");
}); 
app.post("/",function(req,res){
    var cit=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cit+"&appid=cf498a6b7c61a1080e354bc3f49350c0&units=metric";
    https.get(url,function(resp){
        console.log(resp.statusCode);
        resp.on("data",function(data){
            var weatherData=JSON.parse(data);
             var tempi=weatherData.main.temp;
             console.log(tempi);
            var weatherDescription=weatherData.weather[0].description;
            var weatherIcon=weatherData.weather[0].icon;
            var img= "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            // const icon=weatherData.weather[0].icon;
          res.write("<h1> The weather in "+cit+" is "+tempi+" degree celcius.</h1>");
            res.write("<h2>The weather is currently "+weatherDescription+".</h2>");
            res.write("<img src = "+img+">");
            res.send();
            console.log(cit);
              
});



            
            
        })
    });
    