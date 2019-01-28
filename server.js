'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Post } = require('./models');

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(express.static("public"));
app.use('/blog-posts');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/', (req, res) => {
    res.json(Post.get());
});

app.post('/', jsonParser, (req, res) => {
    const reqFields = ['title', 'content', 'author'];
    for (let i = 0; i < reqFields.length; i++) {
        if (!(reqFields[i] in req.body)) {
            const message = `Error: '${reqFields[i]}' field required in request body`;
            console.log(message);
            res.status(400).send(message);
        }
    }
    const item =
        'publishDate' in req.body ?
            Post.create(req.body.title, req.body.content, req.body.author, req.body.publishDate) :
            Post.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(Post.get(item.id));
});

app.put('/', jsonParser, (req, res) => {
    if ("id" in req.body) {
        if (Post.get(req.body.id) !== undefined) {
            const updatedPost = Post.update(req.body);
            res.status(200).json(updatedPost);
        } else {
            const message = `Can't update item '${req.body.id}' because doesn't exist`
            console.log(message);
            res.status(400).send(message);
        }
    } else {
        const message = `Required field "id" not provided in request body`
        console.log(message);
        res.status(400).send(message);
    }
});

app.delete('/:id', (req, res) => {
    if (Post.get(req.params.id) !== undefined) {
        Post.delete(req.params.id);
        res.status(204).end()
    } else {
        const message = `Cannot delete item '${req.params.id}' does not exist`;
        console.log(message);
        res.status(400).send(message);
    }
});

let server;

function runServer(DATABASE_URL, PORT = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on("error", err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("Closing server");
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};