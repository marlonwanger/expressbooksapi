import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import bodyParser from 'body-parser';
import booksRouter from './routes/books';

const app = express(); 

app.config = config;
app.datasource = datasource(app);
app.set('port',7000);
app.use(bodyParser.json()); //vai parsear todos os bodys como json
const Books = app.datasource.models.Books; //Pega o model de book inicializado pelo sequelize

booksRouter(app,Books);

export default app;