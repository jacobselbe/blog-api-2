'use strict';

exports.DATABASE_URL =
    process.env.DATABASE_URL || "mongodb://jacob:imjlmip007@ds245357.mlab.com:45357/blog-posts";

exports.TEST_DATABASE_URL =
    process.env.TEST_DATABASE_URL;

exports.PORT = process.env.PORT || 8080;