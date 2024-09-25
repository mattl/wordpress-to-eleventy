const {getAllPosts} = require("./wordpress");

// process WordPress posts
module.exports = async function () {
    return getAllPosts("posts");
};