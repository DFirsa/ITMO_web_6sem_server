require('dotenv').config({path:'.env'});
const express = require('express');
const ApiRequester = require('./apiRequester');

const app = express();
const apiRequester = new ApiRequester();
const port = 3000;

app.get('/weather/city', async (req, res) => {
    if(!req.query.q) res.status(404).json({});
    else{
        try {
            const apiResponse = await apiRequester.getData(req.query.q);
            res.json(apiResponse);
        } catch (error) {
            res.status(404).json({});
        }
    }
});

app.get('/weather/coordinates', async (req, res) => {
    const regexp = /^-?\d+\.?\d+$/;
    if(!regexp.test(req.query.lat) || !regexp.test(req.query.lon))
        res.status(404).json({});
    else{
        const query = `${req.query.lat},${req.query.lon}`;
        const apiResponse = await apiRequester.getData(query);
        res.json(apiResponse);
    }
});

app.get('/favorites', (req, res) => {
    res.send(req.query.q);
});

app.post('/favorites', (req, res) => {

});

app.delete('/favorites', (req, res) => {

});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});