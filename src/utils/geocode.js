const chalk=require('chalk')
const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJkYXNoIiwiYSI6ImNrNWRwN3RzYzA4emYzZG4zMTBlY3hnYnUifQ.GF5O2KA0jcbXcNrSZOQZkw'

    request({url,json:true},(error,{body})=>{
        
        if(error){
            callback('Unable to connect location service',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to get location service',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })  

}
module.exports = geocode