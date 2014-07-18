// currently this is not being used but later in the future, if we go // down the route of adding the payment gateway into the mobile app.
// we will need to route all calls via a central account. at that time // we will need this file and /env so keep them here
module.exports = {
  development: require('./env/development') || '',
  production: require('./env/production'),
}[process.env.NODE_ENV || 'development'];