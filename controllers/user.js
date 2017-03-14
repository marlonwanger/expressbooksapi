import HttpStatus from 'http-status';

const defaultResponse = (data,statusCode = HttpStatus.OK) => ({
  data,
  statusCode
});

const errorResponse = (message,statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error:message,
},statusCode);

class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
      .then( result => defaultResponse(result))
      .catch( error => errorResponse(error.message))
  }

  getById(params) {
    return this.Users.findOne({where: params})
      .then( (result) => defaultResponse(result)) 
      .catch( (error) => errorResponse(error.message));
  }

  create(data) {
    return this.Users.create(data)
      .then( (result) => defaultResponse(result,HttpStatus.CREATED)) //201 = um recurso foi criado 
      .catch( (error) => errorResponse(error.message,HttpStatus.UNPROCESSABLE_ENTITY)); //422 - Entidade nao processada
  }

  update(data, params) {
    return this.Users.update(data, {
      where: params
    })
      .then( (result) => defaultResponse(result)) 
      .catch( (error) => errorResponse(error.error,HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({where: params})
      .then( (result) => defaultResponse(result,HttpStatus.NO_CONTENT)) 
      .catch( (error) => errorResponse(error.message));
  }
}

export default UsersController;