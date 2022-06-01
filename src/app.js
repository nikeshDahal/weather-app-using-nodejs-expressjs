const path = require('path')
const express = require('express')
const hbs = require('hbs');
const { notDeepEqual } = require('assert');
const request = require("postman-request");
const { json } = require("stream/consumers");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express()
const port=process.env.PORT || 3000;

//define paths for express configuration
const publicDirectoryPath= path.join(__dirname,'../public');
console.log(publicDirectoryPath);
const viewsPath=path.join(__dirname,'../templates/views');
console.log(viewsPath);
const partialsPath = path.join(__dirname,'../templates/partials');
console.log(partialsPath)

//setup handlebars and views location

app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather_app',
        name:'created by nikesh',
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'created by nikesh',
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help Page',
        name:'created by nikesh',
        message:'this is helping message'
    });
})

//weather
app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address){
        return res.send({
            error:'please enter adderss'
        })
    }else{
        geocode(address,(error,{latitude,longtitude,location}={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            forecast(latitude,longtitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error:error
                    })  
                }else{
                    res.send({
                        location:location,
                        weather:forecastData,
                        address:address
                    })

                    }
                })
         })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'created by nikesh',
        errorMessage:'help article not found'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'created by nikesh',
        errorMessage:'page not found'
    });
})










app.listen(port, () => {
    console.log('Server is up on port'+port);
})