//Vamos garantir que toda vez que o app iniciar , vai estar com um cenario limpo, vmaos criar um livro default

describe('Routes Books', () => { //describe passo uma descrição e uma funcao como callback

  const Books = app.datasource.models.Books;
  
  const defaultBook = {
    id:1,
    name:'Default Book'
  }; //Crio um livro padrao para o teste

  //Antes de cada test ele vai apagar tudo do banco e criar
  beforeEach(done => {
    Books
      .destroy({where:{}})
      .then( () => Books.create(defaultBook))
      .then( () => {
        done();
      });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      
      request //request é global definido no helpers.js
        .get('/books') //Rota no qual ele vai verificar
        .end((err,res) => { //Quando acabar, espero um err ou uma response

          expect(res.body[0].id).to.be.eql(defaultBook.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default book
          expect(res.body[0].name).to.be.eql(defaultBook.name);

          done(err); //caso de error, ele passa o error para terminar
        });

    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', done => {
      
      request //request é global definido no helpers.js
        .get('/books/1') //Rota no qual ele vai verificar
        .end((err,res) => { //Quando acabar, espero um err ou uma response

          expect(res.body.id).to.be.eql(defaultBook.id);//o Chai espera que res.body[0].id < que vem da rota seja igual ao default book
          expect(res.body.name).to.be.eql(defaultBook.name);

          done(err); //caso de error, ele passa o error para terminar
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', done => {
      
      const newBook = {
        id: 2,
        name: 'New book'
      };

      request
        .post('/books')
        .send(newBook)
        .end((err,res) => {

          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);

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
        .end((err,res) => {

          expect(res.statusCode).to.be.eql(204); //204 = no content;

          done(err);
        });
    });
  });

});