module.exports = {
  db: 'mongodb://localhost/your_project_development',
  google: {
    clientID:'114383978829-8mgiisdf7a1l8g1pigt37ggjolqdlj1l.apps.googleusercontent.com',
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
    "authId": process.env.plivo_auth_id,
    "authToken": process.env.plivo_auth_token
  }
};
