require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const DAO = require('./services/dao');
const app = express();
const dao = new DAO();
(async () => {await dao.connect()})();
const port = process.env.PORT || 3000;

app.use(cors());

const server = app.listen(port, (err) => {
    if (err) return console.log('Something bad happened', err);
    console.log(`Server is listening on ${port}`);

    require('./routes/routes')(app, dao);
});

process.on('SIGINT', () => server.close(() => {
    dao.disconnect();
}));

process.on('SIGTERM', () => server.close(() => {
    dao.disconnect();
}));