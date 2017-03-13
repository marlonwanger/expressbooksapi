//Arquivo responsavel por iniciar a aplicação

import app from './app';

app.listen(app.get('port'), () => { //Nota .. nesse caso estou utilizando as arrow Functions do es6 () => {} seria isso function() {}
  console.log(`app is running on port ${app.get('port')}`);//feature do es6 ``
});

