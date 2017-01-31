const express=require("express");
const hbs=require("hbs");
const axios=require("axios");
const port=process.env.PORT || 3000;
const geocode=require("./geocode_weather/geocode.js");
var app=express();
app.set("view engine","hbs")
// app.use((req,res,next)=>{
//   geocode.geocode(req.query.adress).then((result)=>{
//     res.send(result);
//   },(error)=>{
//     res.send(error)
//   })
//  next();
// })
hbs.registerPartials(__dirname+"/views/partials/");
var val="";
app.get("/",(req,res)=>{

  geocode.geocode(req.query.adress).then((result)=>{
    if(result.status ==="ZERO_RESULTS"){
      throw new Error("Error find in this address");

    }else{
      console.log("Adress:",result.results[0].formatted_address)
    return axios.get("https://api.darksky.net/forecast/25845017da6f5402d9ae2fed0c56ec55/"+result.results[0].geometry.location.lat+","+result.results[0].geometry.location.lng)
  }
  }).then((res)=>{
    var data=res.data;
    if(res.status === 200){
      var weather_inf={
        summary:data.currently.summary,
        temperature:data.currently.temperature,
        apparentTemperature:data.currently.apparentTemperature
      }
      console.log("Today is "+weather_inf.summary+" is "+weather_inf.temperature+"but it feel like "+weather_inf.apparentTemperature)
    }
    else{
      throw new Error("Error in Server Weather")
    }
  }).catch((e)=>{
    console.log(e.message)
  })
  res.render("home.hbs");
})
app.listen(port,()=>{
  console.log("Server Starting")
})
