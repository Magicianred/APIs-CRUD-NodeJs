import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes/index.js';

const app = express();

//conexão com banco de dados
mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

app.use(bodyParser.urlencoded(
    {
        extended: true
    })
);

app.use(bodyParser.json());

//catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

//catch 500
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Error ${err}`);
    next();
});

//registra as rotas
routes(app);

export default app;