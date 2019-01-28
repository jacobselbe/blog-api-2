'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    publishDate: {type: Number, required: true}
});

postSchema.virtual('authorFullName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.authorFullName,
        publishDate: this.publishDate
    };
};

const Post = mongoose.model('Blog-post', postSchema);

module.exports = {Post};