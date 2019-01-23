const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Blog Posts', function() {
    before(function() {
        return runServer;
    });

    after(function () {
        return closeServer;
    });

    it('should list all blog posts on GET', function () {
        return chai
            .request(app)
            .get('/blog-posts')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res).to.be.json;
                expect(res.body.length).to.be.at.least(1);
                res.body.forEach(function (item) {
                    expect(item).to.be.a('object');
                    expect(item).to.include.keys('title', 'content', 'author');
                });
            });
    });

    it('should add a blog post on POST', function () {
        const post = {title: 'title', content: 'content', author: 'author', publishDate: 4};
        return chai
            .request(app)
            .post('/blog-posts')
            .send(post)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res).to.be.json;
                expect(res.body).to.include.keys('title', 'content', 'author', 'id');
                expect(res.body).to.deep.equal(Object.assign(post, {id: res.body.id}));
            });
    });

    it('should update a blog post on PUT', function () {
        const update = {title: 'title2', content: 'content2'};
        return chai
            .request(app)
            .get('/blog-posts')
            .then(function(res) {
                update.id = res.body[0].id;
                return chai
                    .request(app)
                    .put('/blog-posts')
                    .send(update);
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
            });
    });

    it('should delete a blog post on DELETE', function () {
        return chai
            .request(app)
            .get('/blog-posts')
            .then(function(res) {
                return chai
                    .request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function (res) {
                expect(res).to.have.status(204);
            });
    });
});