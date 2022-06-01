
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
                `Today is ${body.current.weather_descriptions[0]}.
                 current temperature is ${body.current.temperature}.
                 but it feels like ${body.current.feelslike}.
                 humidity is : ${body.current.humidity}.
                 cloud covered is :${body.current.cloudcover}%.
                 wind speed and its direction is : ${body.current.wind_speed} km/hr and ${body.current.wind_degree} degree ${body.current.wind_dir}`)
        }

    })
}
module.exports=forecast;