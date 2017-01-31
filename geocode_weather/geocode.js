const request=require("request");
var geocode_google=(adress)=>{
  return new Promise((resolve,reject)=>{

request({
  url:"http://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(adress),
  json:true
},(error,response,body)=>{

if(error){reject("Unable to connect to server");}else{
  resolve(body);
}
})}
)}
module.exports.geocode=geocode_google;
