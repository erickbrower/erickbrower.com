var config = require('./config/config')[process.env.NODE_ENV || 'development'];
require('./app').listen(config.port);
