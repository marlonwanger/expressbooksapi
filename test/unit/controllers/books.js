import BooksController from '../../../controllers/books';

describe('Controllers Books', () => {
  describe('Get all books getAll()', () => {
    it('Should return a list of books', () => {
      const Books = {
        findAll: td.function(), //ao inves de passar o Model book, simulamos com o testDouble
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.getAll()
        .then( (response) => expect(response.data).to.be.eql(expectedResponse))

    });
  });

  describe('Get a books getById()', () => {
    it('Should return a books', () => {
      const Books = {
        findOne: td.function(), //ao inves de passar o Model book, simulamos com o testDouble
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];

      td.when(Books.findOne({where: {id:1} })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.getById({id:1})
        .then( (response) => expect(response.data).to.be.eql(expectedResponse))

    });
  });

  describe('Create a books ', () => {
    it('Should create a books', () => {
      const Books = {
        create: td.function(), //ao inves de passar o Model book, simulamos com o testDouble
      };

      const requestBody = {
        name: 'Teste Book 2'
      }
      
      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.create(requestBody)
        .then( (response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);          
        });
    });
  });

  describe('Update a books ', () => {
    it('Should update a books', () => {
      const Books = {
        update: td.function(), //funcao mochada
      };

      const requestBody = {
        id: 1,
        name: 'Teste Book updated'
      }
      
      const expectedResponse = [{
        id: 1,
        name: 'Teste Book updated',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];

      td.when(Books.update(requestBody, {where: {id:1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.update(requestBody,{id:1})
        .then( (response) => expect(response.data).to.be.eql(expectedResponse));    
    });
  });

  describe('Delete a books ', () => {
    it('Should delete a books', () => {
      const Books = {
        destroy: td.function(), //funcao mochada
      };

      td.when(Books.destroy({where: {id:1}})).thenResolve({});

      const booksController = new BooksController(Books);

      return booksController.delete({id:1})
        .then( (response) => expect(response.statusCode).to.be.eql(204));    
    });
  });

});