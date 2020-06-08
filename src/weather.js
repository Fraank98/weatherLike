export default function cityWeather(lat,lon,lang, apiKey,textAlert) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+ apiKey +'&lang=' + lang )
    .then(response => response.json())
    .then(data => {
    
    let tempValue = data['main']['temp'];
    tempValue = (tempValue - 273).toFixed(1)
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];
    
    let name = document.querySelector('.WCName')
    let temp = document.querySelector('.WCTemp');
    let desc = document.querySelector('.WCDesc');
    let icon = document.querySelector('#weatherIcon')

    let weatherIcon = data['weather'][0]['icon'];

    let iconLink = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

    name.innerHTML = nameValue;
    desc.innerHTML = descValue;
    temp.innerHTML = tempValue + ' &#186C';
    icon.src = iconLink

    })

    .catch(err => alert(textAlert));
}
    