const axios = require('axios').default;

class ApiRequester {
  constructor() {
    this.host = process.env.APIHOST;
    this.key = process.env.APIKEY;
    this.pattern = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
  }

  convertDir(dir) {
    const dirs = {
      N: 'North', W: 'West', E: 'East', S: 'South',
    };
    let result = '';
    for (let i = 0; i < dir.length; i += 1) {
      result += dirs[dir[i]];
      if (i === 0 && dir.length > 1) result += '-';
    }
    return result;
  }

  reformatResponseJson(json) {
    const { current, location } = json;

    return {
      city: location.name,
      coords: {
        lat: location.lat,
        lon: location.lon,
      },
      temp: `${Math.round(current.temp_c)}°C`,
      wind: `${current.wind_mph} m/s, ${this.convertDir(current.wind_dir)}`,
      cloud: `${current.cloud} %`,
      press: `${current.pressure_mb} hpa`,
      humidity: `${current.humidity} %`,
      icon: current.condition.icon.replace(/64x64/i, '128x128'),
    };
  }

  async getData(cityorCoords) {
    const options = {
      method: 'GET',
      url: this.pattern,
      params: { q: cityorCoords.replace(' ', '%20') },
      headers: {
        'x-rapidapi-key': this.key,
        'x-rapidapi-host': this.host,
      },
    };

    const response = await axios.request(options);
    return this.reformatResponseJson(response.data);
  }

  async getAny(cities){
    return await Promise.all(cities.map(city => {
      return this.getData(city);
    }));
  }
}

module.exports = ApiRequester;