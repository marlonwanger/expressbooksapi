import HttpStatus from 'http-status';

const defaultResponse = (data,statusCode = HttpStatus.OK) => ({ //Interfaces de responses
  data, //Dessa forma o js entende que data:data e statusCode:statusCode
  statusCode
}); //Nota -- ao se utilizar ArrowFunction com ({}) com parenteses, significa que vamos retornar um objeto
 
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({ //Chamo defaultResponse
  error:message,
},statusCode);

class BooksController {
  
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
      .then( (result) => defaultResponse(result) )
      .catch( (error) => errorResponse(error.message))
  }

  getById(params) {
    return this.Books.findOne({where: params})
      .then( (result) => defaultResponse(result)) 
      .catch( (error) => errorResponse(error.message));
  }

  create(data) {
    return this.Books.create(data)
      .then( (result) => defaultResponse(result,HttpStatus.CREATED)) //201 = um recurso foi criado 
      .catch( (error) => errorResponse(error.message,HttpStatus.UNPROCESSABLE_ENTITY)); //422 - Entidade nao processada
  }

  update(data, params) {
    return this.Books.update(data, {
      where: params
    })
      .then( (result) => defaultResponse(result)) 
      .catch( (error) => errorResponse(error.error,HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Books.destroy({where: params})
      .then( (result) => defaultResponse(result,HttpStatus.NO_CONTENT)) 
      .catch( (error) => errorResponse(error.message));
  }
}

export default BooksController;