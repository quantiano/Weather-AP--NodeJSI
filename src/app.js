const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const forecast = require('./utils_extra/forecast')
//const geocode = require('./utils_extra/geocode')


//console.log(__dirname)
//console.log(path.join(__dirname, '../templates/partials'))

// 1. Create Express app
const app = express() // app is our website and we use express
const port = process.env.PORT || 3000

// 2. Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // สิ่งที่จะสามารถใช้ hbs ใน partials folder ได้
const partialsPath = path.join(__dirname, '../templates/partials') // สิ่งที่จะถูกใช้ในหน้าอื่่นๆได้ เช่น header, footer


// 3. Define path for static files (html)
app.use(express.static(publicDirectory))

// 4. Setup handlebars engine and views location
app.set('view engine', 'hbs') // บอกให้ใช้ engine hbs ในการ render
app.set('views', viewsPath) // บอกให้ไปหาใน path viewsPath, views จะสามารถใช้ partials ได้
hbs.registerPartials(partialsPath) // Define ให้ files ที่อยู่ใน partialsPath เป็น hbs เพื่อเรีกยใช้ได้ทุกหน้า


// 5. Setup path for each one
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        text: 'Weather API via geocode & mapbox',
        name: 'ntppmm @ main'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        text: 'This is us!',
        name: 'ntppmm @ about'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpTexts: 'HELP!!',
        title: 'Help',
        name: 'ntppmm @ help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('errors', {
        title: '404',
        errormsg: 'no help page you are looking',
        name: 'ntppmm @ help page'
    })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.render('index',{ // return == stop execute
            error_lastest: 'no location input!',
            title: 'Weather',
            text: 'Weather API via geocode & mapbox',
            name: 'ntppmm @ main'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location_geo} = {}) => { // geocode(input, callback function to get a value back, we expect error, latitude, longtitude, location) callback function = (error, data)
        if(error){
            return res.send({error_lastest: 'error query!'})
        }

        forecast(latitude, longtitude, (error, {forecastData, location_fore, feelslike_fore, humidity_fore} = {}) => { // forecast(input1, input2, callback function to get a value back) callback function = (error, data)
            if(error){
                return res.send({error_lastest: 'error forecast query!'})
            }

            res.send({
                location_lastest: location_fore,
                forecast_lastest: forecastData,
                feelslike_lastest: feelslike_fore,
                humidity_lastest: humidity_fore,
                address: req.query.address,
                combine_all: 'This is for '+location_fore+'. Forecast is '+forecastData+'. It feels like '+ feelslike_fore+'. Humidity is about '+humidity_fore+' .Address you are searching is '+ req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    
    if (!req.query.search) { // check for error search
        return res.send({ // return == stop execute!
            error: 'You must provide a search name!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [{
            title: 'p1',
            cost: 1
        },{
            title: 'p2',
            cost: 2
        }]
    })
})

app.get('*', (req, res) => {
    res.render('errors', {
        title: '404',
        errormsg: 'page not found',
        name: 'ntppmm @ 404'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port+'...')
})


// app.get('', (req, res) =>{ // home page default 
//     res.send('default page')
// })

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })