const request = require('request')

const forecast = (lat, long, callback) => {
    const latlong_url = 'http://api.weatherstack.com/current?access_key=75bb402b9047abf25e859e07e3207376&query='+lat+','+long
    console.log(latlong_url)

        request({url: latlong_url, json:true}, (error, response)=>{ // error response นี้เป็นของ request

            if(error){
                callback('There is some low error', {
                    location: '',
                    forecastData: ''
                })
            }else{

            if(response.body.error){ 
                callback('Lat Long Coordinate error. Try another!', undefined) //ใช้ callback ที่เรายัด function มาในส่วนของ input มาส่งค่ากลับ
            } else {
                //console.log(response.data.location.name)
                console.log(response.body.location.name)
                callback(undefined, {
                    location_fore: response.body.location.name,
                    forecastData: response.body.current.weather_descriptions,
                    humidity_fore: response.body.current.humidity,
                    feelslike_fore: response.body.current.feelslike,
                })
            }
            }
        })
    
    
    
}

module.exports = forecast