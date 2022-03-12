const request = require('request')

const geocode = (address, callback) => { // geocode(input, callback function for sending value back)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibnRwcG1tIiwiYSI6ImNremZpbThmNDNpOGkyb28yMWkzbTkwa2cifQ.etUkXdxPcinUdrfsESuGZg&limits=1'
    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length == 0){
            callback('Result not found! try another place', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[0], 
                longtitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode