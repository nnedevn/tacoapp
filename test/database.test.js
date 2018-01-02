/* globals it: true} */
/* globals describe: true} */
/* globals before: true */
// --- Above are JSHint's Linter Settings for this particular file --- //
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');


before(function(done) {
  db.sequelize.sync({ force: true })
    .then(function() {
      done();
    });
});

describe("GET /", function() {
  it("should return a 200 response", function(done) {
    request(app).get("/")
    .expect(200, done);
  });
});

describe("GET /tacos", function() {
  it("should return a 200 response", function(done) {
    request(app).get("/tacos")
    .expect(200, done);
  });
});

describe("POST /tacos", function() {
  it("should create a taco and redirect to /tacos after posting a taco", function(done) {
    request(app).post("/tacos")
    .type("form")
    .send({
      name: "Super taco",
      amount: 9001
    })
    .expect("Location", "/tacos")
    .expect(302, done);
  });
});

// describe('GET /tacos/', function(){
//   it('Should return a 200 when accessing /tacos')
// })

describe("PUT /tacos/:/id", function() {
  it("should take an existing taco, update the taco, and return a 200 response", function(done) {
    request(app).put("/tacos/1")
    .type("form")
    .send({
      name: "Uber taco",
      amount: 901
    })
    //.expect("Location", "/tacos")
    .expect(200, done);
    //     (response.statusCode).to.equal(200)
  });
});

describe("GET /tacos/new", function() {
  it("should return a 200 response", function(done) {
    request(app).get("/tacos/new")
    .end(function(err, response){
          expect(response.statusCode).to.equal(200);
      done();
    });

  });

  it('should load a taco edit page abd return 200', function(){
    request(app).get('/tacos/1/edit')
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should load a taco return 200', function(done){
    request(app).get('/tacos/1')
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      done();
    })
  })
});

describe("DELETE /tacos/:/id", function() {
  it("should return a 200 response on deletion of that bad taco", function(done) {
    request(app).delete("/tacos/1")
    .end(function(err, response) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("msg");
      expect(response.body.msg).to.equal("success");
      done();
    });
  });
});
// Write an additional test for DELETE /tacos/:id to test deleting a taco that does not exist. 
// Remember to think about the results you should expect, then write the tests to reflect those behaviors.
// Write a set of tests for PUT /tacos/:id
// Write tests for the remaining routes:
// GET /tacos/new
// GET /tacos/:id/edit
// GET /tacos/:id
describe("DELETE /tacos/:/id", function() {
  it("shoud return a 404 response on deletion of a taco that does not exist", function(done) {
    request(app).delete("/tacos/100000")
    .end(function(err, response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
