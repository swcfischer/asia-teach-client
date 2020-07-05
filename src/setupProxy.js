const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api/*',
    proxy({
      target: 'https://historic-arches-33577.herokuapp.com',
    })
  );
};
