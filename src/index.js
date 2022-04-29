import cityWeather from './weather'

let lat,lon
let lang
let textTime = "Obtained at "
let textAlert = "Wrong city name"
const apiKey = process.env.apiKey

$(document).ready(function(){
    $('#search').focus()

    // Tooltips Initialization
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
     })
});

window.onload = function() {
    
let input = document.querySelector('#search');

let name = document.querySelector('.WCName')
let temp = document.querySelector('.WCTemp');
let desc = document.querySelector('.WCDesc');

let currentWeather = document.querySelector(".getCurrentWeather")
let selectedLangEn = document.querySelector("#en")
let selectedLangIt = document.querySelector("#it")

let icon = document.querySelector('#weatherIcon')

let button= document.querySelector('.submit');

lang = document.documentElement.lang

if (lang == "it"){
    textTime = "Ottenuto alle "
    selectedLangIt.selected = true
    textAlert = 'Nome citt\u00E0 inesistente';
}
else if (lang == "en"){
    selectedLangEn.selected = true
}


if ($(document).width() < "900"){
    currentWeather.removeAttribute("data-toggle")
}

//----------------- AlgoliaApi - Start ------------------

(function autoComplete() {
    var placesAutocomplete = places({
        appId: process.env.algoliaAppId,
        apiKey: process.env.algoliaApiKey,
        container: document.querySelector('#search'),
        templates: {
            value: function(suggestion) {
            let name = suggestion.name
            return name    
            }
        }
    }).configure({
        type: 'city',
        aroundLatLngViaIP: false
    })
})()

//----------------- AlgoliaApi - End ------------------

//----------------- GeoLocation - Start ------------------

currentWeather.addEventListener("click", getLocation)

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        name.innerHTML = "Loading..."
        temp.innerHTML = ""
        desc.innerHTML = ""
    } else { 
        alert("Geolocation is not supported")
    }
    }

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    cityWeather(lat,lon,lang,apiKey,textAlert)
    time(lang)
    } 
getLocation()

//----------------- GeoLocation - End ------------------
    
//----------------- OpenWeather - Start ------------------

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+ apiKey +'&lang='+lang)
    .then(response => response.json())
    .then(data => {
    
    let tempValue = data['main']['temp'];
    tempValue = (tempValue - 273).toFixed(1)
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];
    let weatherIcon = data['weather'][0]['icon'];

    let iconLink = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

    time(lang)
    icon.src = iconLink
    name.innerHTML = nameValue;
    desc.innerHTML = descValue;
    temp.innerHTML = tempValue + ' &#186C';
    input.value=""
    input.removeAttribute("focus")

    })

    .catch(err => alert(textAlert));
})

//----------------- OpenWeather - End ------------------

}

function time(lang){
    let moment = require('moment');
    let date = moment().locale(lang).format("lll");
    let localTime = document.querySelector("#localTime");

    localTime.innerHTML = date;
}
