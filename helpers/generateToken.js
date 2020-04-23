const RandExp = require('randexp')

function genererate_token() {
    return new RandExp(/[0-9A-Za-z]{10}/).gen()
}

module.exports = genererate_token