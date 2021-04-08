require('dotenv').config({ path: '../.env' });
const express = require('express');
const ApiRequester = require('./apiRequester');

const apiRequester = new ApiRequester();
const app = express();
const port = process.env.PORT || 3000;

const DAO = require('./dao');

const dao = new DAO();

app.get('/weather/city', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  if (!req.query.q) res.status(404).json({});
  else {
    try {
      const apiResponse = await apiRequester.getData(req.query.q);
      res.json(apiResponse);
    } catch (error) {
      res.status(400).json({});
    }
  }
});

app.get('/weather/coordinates', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  const regexp = /^-?\d+\.?\d+$/;
  if (!regexp.test(req.query.lat) || !regexp.test(req.query.lon)) { res.status(404).json({}); } else {
    const query = `${req.query.lat},${req.query.lon}`;
    const apiResponse = await apiRequester.getData(query);
    res.json(apiResponse);
  }
});

app.get('/favorites', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  const favorites = await dao.getAll();

  const favoritesWeather = await Promise.all(favorites.map(async (city) => await apiRequester.getData(city)));
  res.json({ favorites: favoritesWeather });
});

app.post('/favorites', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  if (!req.query.city) res.status(404).send();
  else {
    try {
      const data = await apiRequester.getData(req.query.city);
      const city = await dao.insert(data.city, data.coords);
      res.status(200).json({ name: city });
    } catch {
      res.status(400);
    }
  }
});

app.delete('/favorites', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','https://dfirsa.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE');

  if (!req.query.city) res.status(404).send();
  else {
    await dao.delete(req.query.city);
    res.status(200).send();
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server is listening on ${port}`);
});
