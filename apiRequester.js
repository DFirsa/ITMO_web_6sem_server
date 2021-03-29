const fetch = require('node-fetch');

class ApiRequester{

    constructor(){
        this.host = process.env.APIHOST;
        this.key = process.env.APIKEY;
        this.pattern = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=';
    }

    reformatResponseJson(json){
        const current = json.current;
        const location = json.weather;
        
        return {
            city: location.name,
            coords: '[ ${location.lat}, ${location.lon} ]',
            temp: `${Math.round(current.temp_c)}°C`,
            wind: `${current.wind_mph} m/s, ${convertDir(current.wind_dir)}`,
            cloud: `${current.cloud} %`,
            press: `${current.pressure_mb} hpa`,
            humidity: `${current.humidity} %`,
            icon: current.condition.icon.replace(/64x64/i, '128x128') 
        };
    }

    async getData(cityorCoords){
        const query = this.pattern + cityorCoords;
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.key,
                'x-rapidapi-host': this.host
            }
        });
        // return reformatResponseJson(response.json());
        return response.json();
    }
}

module.exports = ApiRequester;