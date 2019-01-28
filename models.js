'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    publishDate: {type: Number, required: true}
});

postSchema.methods.serialize = function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.author,
        publishDate: this.publishDate
    };
};

const Post = mongoose.model('Blog-post', postSchema);

module.exports = {Post};