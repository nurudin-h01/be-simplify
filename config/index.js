const mongoose = require('mongoose')

async function DBConnection(url, options) {
    return mongoose.connect(url, options);
}

module.exports = DBConnection