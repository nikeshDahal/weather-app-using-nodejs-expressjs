const request = require('postman-request');
const geocode=(address,callback)=>{
    const encodedAddress=encodeURIComponent(address);
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoibmlrZXNoLWRhaGFsIiwiYSI6ImNsM3M5a3NqMTByengzY3A3Nm0wa2w0eGEifQ.LQisrJtyg-E6h3yJlQT4Ww&limit=1`;
    request({url:url,json:true},(error,response,body)=>{
        if(error){
            return callback('unable to connect to geocoding api',undefined);
        }else if(body.error){
            return callback('unable to find location',undefined);

        }else{
            return callback(undefined,{
                latitude   :body.features[0].center[1],
                longtitude :body.features[0].center[0],
                location   :body.features[0].place_name
            })

        }

    })

}
module.exports=geocode;