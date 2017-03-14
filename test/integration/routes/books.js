//Vamos garantir que toda vez que o app iniciar , vai estar com um cenario limpo, vmaos criar um livro default
import jwt from 'jwt-simple'
describe('Routes Books', () => { //describe passo uma descrição e uma funcao como callback

  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id:1,
    name:'Default Book',
    description: 'Default Description',
  }; //Crio um livro padrao para o teste

  let token;

  const defaultUser = {
    name:"testes",
    email: "teste@mail.com",
    password: "123456"
  }

  //Antes de cada test ele vai apagar tudo do banco e criar
  beforeEach(done => {
    Users.destroy({where: {}})
      .then( () => Users.create(defaultUser))
      .then( user => {
        Books.destroy({where: {}})
          .then( () => Books.create(defaultBook))
          .then( () => {
            token = jwt.encode({id:user.id},jwtSecret);
            done();
          })
      })
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      
      request //request é global definido no helpers.js
        .get('/books') //Rota no qual ele vai verificar
        .set('Authorization',`JWT ${token}`)
        .end((err,res) => { //Quando acabar, espero um err ou uma response

          expect(res.body[0].id).to.be.eql(defaultBook.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default book
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);

          done(err); //caso de error, ele passa o error para terminar
        });

    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', done => {
      
      request //request é global definido no helpers.js
        .get('/books/1') //Rota no qual ele vai verificar
        .set('Authorization',`JWT ${token}`)
        .end((err,res) => { //Quando acabar, espero um err ou uma response

          expect(res.body.id).to.be.eql(defaultBook.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default book
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);

          done(err); //caso de error, ele passa o error para terminar
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', done => {
      
      const newBook = {
        id: 2,
        name: 'New book',
        description: 'New book description'
      };

      request
        .post('/books')
        .set('Authorization',`JWT ${token}`)
        .send(newBook)
        .end((err,res) => {

          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);
          expect(res.body.description).to.be.eql(newBook.description);

          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', done => {
      
      const updatedBook = {
        id: 1,
        name: 'Updated Book'
      };

      request
        .put('/books/1')
        .set('Authorization',`JWT ${token}`)
        .send(updatedBook)
        .end((err,res) => {

          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', done => {
      
      request
        .delete('/books/1')
        .set('Authorization',`JWT ${token}`)
        .end((err,res) => {

          expect(res.statusCode).to.be.eql(204); //204 = no content;

          done(err);
        });
    });
  });

});