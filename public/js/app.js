console.log('client side js file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const messageThree = document.querySelector('#message3')
const messageFour = document.querySelector('#message4')
const messageFive = document.querySelector('#message5')
const messageSix = document.querySelector('#message6')

weatherForm.addEventListener('submit', (e) => { // listen on submit event and callback function named e
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    if(!location){
        messageOne.textContent = 'input is invalid!'
        messageTwo.textContent = ''
        messageThree.textContent = ''
        messageFour.textContent = ''
        messageFive.textContent = ''
        messageSix.textContent = ''
        return console.log('input is invalid')
    }

    //fetch('http://localhost:3000/weather?address='+location).then((response) => { // อันนี้เรา fetch ไปที่ app.js เรา เพื่อรอ res กลับมา ** localhost **
    fetch('/weather?address='+location).then((response) => { // อันนี้เรา fetch ไปที่ app.js เรา เพื่อรอ res กลับมา ** heroku **
    response.json().then((data) => { // เอา response ที่เป็น json มาแกะเอา data
        
        // เรา res.send มา 1 ค่าถ้า error และ 3 ค่าถ้าไม่ error ได้แก้ location, forecast, address
        if(data.error_lastest){     
            console.log('data error')
            messageOne.textContent = 'No data'
            messageTwo.textContent = ''
            messageThree.textContent = ''
            messageFour.textContent = ''
            messageFive.textContent = ''
            messageSix.textContent = ''
        }else{
            console.log('everything is fine!')
            messageOne.textContent = data.location_lastest
            messageTwo.textContent = data.forecast_lastest
            messageThree.textContent = data.feelslike_lastest
            messageFour.textContent = data.humidity_lastest
            messageFive.textContent = data.address
            messageSix.textContent = data.combine_all
        }
    })
})

})