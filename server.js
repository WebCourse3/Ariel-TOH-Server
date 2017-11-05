const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const heroesRouter = require('./heroes-router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/heroes', heroesRouter);

app.listen(3000, () => {
    console.log('started at 3000');
});
