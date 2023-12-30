import {requestPhoto, getQuote, getWeatherData, findnthoccurance, hexToRgb} from "./functions.js"

const image_button = document.getElementById("img-button")
const background_imgContainer = document.getElementById("background-container")
const background_image = document.getElementById("background-image")
const time_div = document.getElementById("time-div")
let adaptiveElements = document.getElementsByClassName("adaptive-color")
let shadow_casting_elements = document.getElementsByClassName("shadowed")

let latitude = ""
let longitude = ""
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(latitude, longitude)
        printWeatherData(latitude, longitude)
    }, error => {
        console.log("error getting co-ordinates")
    })
}

let currentDate = new Date();
let date = currentDate.toDateString()
let time = currentDate.toTimeString()
time = time.slice(0, findnthoccurance(time, ":", 2))
date = date.slice(0, findnthoccurance(date, " ", 3))
console.log(currentDate, time, date)
document.getElementById("date-header").innerText = date
document.getElementById("time-header").innerText = time

setInterval(() => {
    let currentDate = new Date();
    let date = currentDate.toDateString()
    let time = currentDate.toTimeString()
    time = time.slice(0, findnthoccurance(time, ":", 2))
    date = date.slice(0, findnthoccurance(date, " ", 3))
    document.getElementById("date-header").innerText = date
    document.getElementById("time-header").innerText = time
}, 5000)

let data = {}

displayImage()

image_button.addEventListener("click", displayImage)

document.getElementById("color-mode").addEventListener("change", function(e){
    if(document.getElementById("color-mode").value == "adaptive") {
        for(let element of adaptiveElements){
            element.style.color = `${data.color}`
        }
        for(let element of shadow_casting_elements){
            element.style.textShadow = `0px 0px 30px ${data.photoColor}`
        }
    }
    else{
        for(let element of adaptiveElements){
            element.style.color = "white"
        }
        for(let element of shadow_casting_elements){
            element.style.textShadow = `0px 0px 30px gray`
        }
    }
})

document.getElementById('google-search-form').onsubmit = function() {
    let input = document.querySelector('[name="q"]');
    if (input.value.trim() === '') {
        alert('Please enter a search query');
        return false;
    }
};

async function printWeatherData(latitude, longitude){
    latitude = String(latitude)
    longitude = String(longitude)
    let weatherData = await getWeatherData(latitude, longitude)
    console.log(weatherData)
    document.getElementById("location-header").innerText = weatherData.location.name
    document.getElementById("temperature-header").innerText = `${weatherData.current.temp_c}°C`
    document.getElementById("wind-header").innerText = `${weatherData.current.wind_kph} KPH`
    document.getElementById("rain-header").innerText = `${weatherData.current.precip_mm} MM`
}

async function displayImage(){
    let query = document.getElementById("category").value
    data = await requestPhoto(query, "landscape")
    data["rgb"] = hexToRgb(data.photoColor)
    background_image.src = `${data.urls.full}`
    document.getElementById("photographer-info").innerText = data.author
    if(document.getElementById("color-mode").value == "adaptive"){
        for(let element of adaptiveElements){
            element.style.color = `${data.color}`
        }
        for(let element of shadow_casting_elements){
            element.style.textShadow = `0px 0px 30px ${data.photoColor}`
        }
    }
    else{
        for(let element of adaptiveElements){
            element.style.color = "white"
        }
        for(let element of shadow_casting_elements){
            element.style.textShadow = "0px 0px 30px gray"
        }
    }
    let quote = await getQuote("")
    console.log(quote)
    document.getElementById("quote").innerText = `${quote}`
}
