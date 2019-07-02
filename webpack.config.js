if (process.env.NODE_ENV === 'development') {
    module.exports = require('./packconfig/dev.config');
} else {
    module.exports = require('./packconfig/production.config');
}
