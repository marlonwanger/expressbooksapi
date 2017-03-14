//Vamos garantir que toda vez que o app iniciar , vai estar com um cenario limpo, vmaos criar um livro default

describe('Routes Users', () => { //describe passo uma descrição e uma funcao como callback

  const Users = app.datasource.models.Users;
  
  const defaultUser = {
    id:1,
    name:'Default User',
    email: 'teste@mail.com',
    password: 'teste'
  }; //Crio um livro padrao para o teste

  //Antes de cada test ele vai apagar tudo do banco e criar
  beforeEach(done => {
    Users
      .destroy({where:{}})
      .then( () => Users.create(defaultUser))
      .then( () => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', done => {
      
      request //request é global definido no helpers.js
        .get('/users') //Rota no qual ele vai verificar
        .end((err,res) => { //Quando acabar, espero um err ou uma response
          
          expect(res.body[0].id).to.be.eql(defaultUser.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default user
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);

          done(err); //caso de error, ele passa o error para terminar
        });

    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', done => {
      
      request //request é global definido no helpers.js
        .get('/users/1') //Rota no qual ele vai verificar
        .end((err,res) => { //Quando acabar, espero um err ou uma response

          expect(res.body.id).to.be.eql(defaultUser.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default user
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);       

          done(err); //caso de error, ele passa o error para terminar
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', done => {
      
      const newUser = {
        id: 2,
        name: 'New user',
        email: 'newmail@mail.com',
        password: 'test1'
      };

      request
        .post('/users')
        .send(newUser)
        .end((err,res) => {

          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);

          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', done => {
      
      const updatedUser = {
        id: 1,
        name: 'Updated user'
      };

      request
        .put('/users/1')
        .send(updatedUser)
        .end((err,res) => {

          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', done => {
      
      request
        .delete('/users/1')
        .end((err,res) => {

          expect(res.statusCode).to.be.eql(204); //204 = no content;

          done(err);
        });
    });
  });

});