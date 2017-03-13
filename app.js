import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import bodyParser from 'body-parser';

const app = express(); 

app.config = config;
app.datasource = datasource(app);
app.set('port',7000);
app.use(bodyParser.json()); //vai parsear todos os bodys como json

const Books = app.datasource.models.Books; //Pega o model de book inicializado pelo sequelize

app.route('/books')
  .get((req,res) => {
    Books.findAll({})
      .then( (result) => res.json(result)) 
      .catch( (err) => res.status(412));
  })
  .post( (req,res) => {
    Books.create(req.body)
      .then( (result) => res.json(result)) 
      .catch( (err) => res.status(412));
  });

app.route('/books/:id')
  .get((req,res) => {
    Books.findOne({where: req.params})
      .then( (result) => res.json(result)) 
      .catch( (err) => res.status(412));
  })
  .put((req,res) => {
    Books.update(req.body,{where: req.params})
      .then( (result) => res.json(result)) 
      .catch( (err) => res.status(412));
  })


export default app;