const chalk = require('chalk')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))  

//define path for express
const pubPath = path.join(__dirname,'../src/public')
const viewpath = path.join(__dirname,'../templet/views')
const partialspath = path.join(__dirname,'../templet/partials')

//setup handler view location
app.set('view engine','hbs') 
app.set('views',viewpath) 
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pubPath))


app.get('',(req, res)=>{

    res.render('index',{
        title:'Weather',
        name:'Pramit Dash'
    })
})

app.get('/about',(req, res)=>{

    res.render('about',{
        title:'About',
        name:'Pramit Dash'
    })
})

app.get('/help',(req, res)=>{

    res.render('help',{
        title:'Help',
        name:'Pramit Dash'

    }) 
})

app.get('/help/*',(rq,res)=>{

    res.render('404',{
        title:'404',
        name:'Pramit Dash',
        error:'Help article not found..'
    })

})



app.get('/weather',(req,res)=>{
    if(req.query.search){
        return res.send({
            error:'You must provide an address'
        })
    }
    
geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{
    if(error){
        console.log(error)
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        
         res.send({
             forecast:forecastData,
             location,
             address:req.query.address
         })   
    })
  })
})


app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

}) 

app.get('*',(rq,res)=>{

    res.render('404',{
        title:'404',
        name:'Pramit Dash',
        error:'Error, page not found'
    })
}) 

 





// app.get('/weatherapp',(req,res)=>{
//     res.send('<h1>WelCome to Weather App</h1>')
// })

// app.get('/locationapp',(req,res)=>{
//     res.send('Welcome to Location App')
// })


app.listen(3000,()=>{

    console.log(chalk.green.inverse('server running on port 3000...'))
}) 