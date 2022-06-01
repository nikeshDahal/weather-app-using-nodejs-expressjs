
const request = require('postman-request');
const forecast = (latitude,longtitude,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=7b0012a2768792378d000652beef6e77&query=${latitude},${longtitude}&units=m`;
    request({url:url, json:true},(error,response,body)=>{
        if(error){
            callback('unable to connect with weather services',undefined);
        }else if(body.error){
            callback("invalid location",undefined);
        }else{
            callback(undefined,
                `it is ${body.current.weather_descriptions[0]} it is currenetly ${body.current.temperature}. but it feels like ${body.current.feelslike}`)
        }

    })
}
module.exports=forecast;