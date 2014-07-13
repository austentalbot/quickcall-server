module.exports = {
  db: 'mongodb://localhost/your_project_development',
  google: {
    clientID:'114383978829-8mgiisdf7a1l8g1pigt37ggjolqdlj1l.apps.googleusercontent.com',
// '267057860316-qjdth18861rb2h8j4pnsupv03pipjagq.apps.googleusercontent.com',
    // consumerSecret: 'd1SHrhiP_-jS1SITy46gwK5t',
    clientSecret: 'Bmw2epStxC9nCEKo-vn6M3Vq',
    callbackURL: 'http://localhost:3000/',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  },
  plivo: {
      "authId": "MAZDFKYJA1OTU2M2NKMG",
      "authToken": "YzA0ZWJkOGJlYzQyNGMyMWEyMmRmODdkYTcyM2Rl"
  }
};
