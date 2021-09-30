console.log('client side js activated');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = "Loading..."
messageTwo.textContent = ""
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
         

            console.log(data);
            messageOne.textContent = "Outside temp is " + data.forecastData.outside_temp + ". Inside temp is " + data.forecastData.temp +  ". Weather is " + data.forecastData.weather + "."
            messageTwo.textContent = data.placeName;
        })
    })
})
