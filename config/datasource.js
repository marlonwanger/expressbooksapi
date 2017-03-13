import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

/*Carrega os models automaticamente*/
const loadModels = (sequelize) => {
  const dir = path.join(__dirname,'../models');
  let models = [];
  fs.readdirSync(dir).forEach( (file) => {
    const modelDir = path.join(dir,file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

export default (app) => {
  //Singleton para carregar o banco
  if(!database) {
    //Nota os imports foram todos feitos na app.js
    const config = app.config; //É bom evitar import do proprio projeto pois depois fica dificil de testar , é mais facil injetar.
    const sequelize = new Sequelize( //Inicializa um banco com essas configs
      config.database,
      config.username,
      config.password,
      config.params
    );

    database = {
      sequelize, //banco instanciado
      Sequelize, //A dependencia do Sequelize inteira
      models: {}
    };

    database.models = loadModels(sequelize);

    sequelize.sync().done( () => {
      return database;
    }); //Isso garante que cada vez que eu inciar a aplicação ele vai sincronizar
  }
  return database;
}; 