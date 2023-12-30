export async function requestPhoto(query, orientation="landscape"){
    try {
        const response = await fetch(`https://chrome-extension-backend-dta3.onrender.com/random-photo?query=${query}&orientation=${orientation}`)
        if(response.ok) {
            let data = response.json()
            return data
        }
        else{
            throw Error("error occurred")
        }
    }
    catch (error){
        console.log(error)
    }
}

export async function getQuote(tags){
    try {
        const response = await fetch(`https://chrome-extension-backend-dta3.onrender.com/quotable?tags=${tags}`)
        if (response.ok) {
            let quote = await response.json()
            return quote
        } else {
            throw Error("error occurred")
        }
    }
    catch (error){
        console.log(error)
    }
}

export async function getWeatherData(latitude, longitude){
    try {
        console.log(latitude, longitude)
        const response = await fetch(`https://chrome-extension-backend-dta3.onrender.com/weather?lat=${latitude}&long=${longitude}`)
        let weatherData = await response.json()
        return weatherData
    }
    catch (e){
        console.log(e)
        return {
            state: false
        }
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

export function findnthoccurance(string, value, n){
    let index = -1
    for(let i = 0; i < n; i++){
        index = string.indexOf(value, index+1)
    }
    return index
}

export function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    let rgb = []
    for(let i  = 0; i < 3; i++){
        rgb[i] = parseInt(hex.substring(i*2, i*2 + 2), 16)
    }

    return rgb
}
