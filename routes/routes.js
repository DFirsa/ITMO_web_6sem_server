const asyncHandler = require('express-async-handler')
const ApiRequester = require('../services/apiRequester');
const apiRequester = new ApiRequester();
const isValidCoords = require('../services/validCoords');

module.exports = (app, dao) => {
    app.get('/weather/city', asyncHandler(async (req, res) => {
        if (!req.query.q) {
          res.status(404).json();
          return;
        }
        
        const apiResponse = await apiRequester.getData(req.query.q);
        res.json(apiResponse);
      }));

    app.get('/weather/coordinates', async (req, res) => {
        if (!isValidCoords(req.query.lat, req.query.lon)){
          res.status(404).json();
          return;
        }

        const query = `${req.query.lat},${req.query.lon}`;
        const apiResponse = await apiRequester.getData(query);
        res.json(apiResponse);
    });

    app.get('/favorites', async (req, res) => {
        const favorites = await dao.getAll();
        const favoritesWeather = await apiRequester.getAny(favorites);
        
        res.json({ favorites: favoritesWeather });
    });

    app.post('/favorites', asyncHandler(async (req, res) => {
        if (!req.query.city){
          res.status(404).send();
          return;
        }
        
        const data = await apiRequester.getData(req.query.city);
        const city = await dao.insert(data.city, data.coords);
        res.status(201).json({ name: city });
    }));

    app.delete('/favorites', async (req, res) => {
        if (!req.query.city){
          res.status(404).send();
          return;
        }
      
        await dao.delete(req.query.city);
        res.status(204).send();
    });
}