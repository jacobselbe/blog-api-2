'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Post } = require('./models');

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/blog-posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.json({
                posts: posts.map(post => post.serialize())
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal erver error'});
        });
});

app.get('/blog-posts/:id', (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

app.post('/blog-posts', (req, res) => {
    const reqFields = ['title', 'content', 'author'];
    for (let i = 0; i < reqFields.length; i++) {
        if (!(reqFields[i] in req.body)) {
            const message = `Error: '${reqFields[i]}' field required in request body`;
            console.log(message);
            res.status(400).send(message);
        }
    }
    Post
        .create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            publishDate: Date.now()
        })
        .then(post => res.status(201).json(post.serialize()))
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

app.put('/blog-posts/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message =
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body.id}) must match`;
        console.error(message);
        return res.status(400).json({ message: message });
    }
    const toUpdate = {};
    const updateableFields = ['title', 'content', 'author'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Post
        .findByIdAndUpdate(req.params.id, { $set: toUpdate })
        .then(post => res.status(204).end())
        .catch(err => res.status(500).json({ message: "Internal server error" }));
});

app.delete('/blog-posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => res.status(204).end())
        .catch(err => res.status(500).json({ message: "Internal server error" }));
});

app.use("*", function (req, res) {
    res.status(404).json({ message: "Not Found" });
});

let server;

function runServer(DATABASE_URL, port = PORT) {
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