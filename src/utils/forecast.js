const request=require('request')
const chalk=require('chalk')

const forecast = (latitude,longitude,callback) =>{
    const url='https://api.darksky.net/forecast/592957f1550c5752b1b5b3c38c5c6904/'+latitude + ','+longitude+'?units=si'
    
    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to get the Forecast Service!',undefined)
        }
        else if(body.error){
            callback('Unable to get the Location Service!',undefined)
         }
        else{
            callback(undefined,chalk.green.inverse('Tempreture is '+ body.currently.temperature +'degree celcious, chancees of rain is '+body.currently.precipProbability+'% '))
        }
      
    })
}

module.exports= forecast














