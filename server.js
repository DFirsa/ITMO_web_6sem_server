require('dotenv').config({path:'.env'});
const express = require('express');
const ApiRequester = require('./apiRequester');

const app = express();
const apiRequester = new ApiRequester();
const port = 3000;

app.get('/weather/city', async (req, res) => {
    console.log(req.query.q)
    if(!req.query.q) res.status(404).json({});
    else{
        const apiResponse = await apiRequester.getData(req.query.city);
        res.json(apiResponse);
    }
});

app.get('/weather/coordinates', (req, res) => {
    res.send(req.query.q);
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