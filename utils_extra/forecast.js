const request = require('request')

const forecast = (lat, long, callback) => {
    const latlong_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lat+','+long+'.json?access_token=pk.eyJ1IjoibnRwcG1tIiwiYSI6ImNremZpbThmNDNpOGkyb28yMWkzbTkwa2cifQ.etUkXdxPcinUdrfsESuGZg&limits=1'
    try{
        request({url: latlong_url, json:true}, (error, response)=>{ // error response นี้เป็นของ request
            if(response.body.features.length == 0){ 
                callback('Lat Long Coordinate error. Try another!', undefined) //ใช้ callback ที่เรายัด function มาในส่วนของ input มาส่งค่ากลับ
            } else {
                callback(undefined, response.body.features[0].context[0].text)
            }
        })
    } catch(error){ // big error from logic
        callback('There is some low error', undefined)
    }
}

module.exports = forecast