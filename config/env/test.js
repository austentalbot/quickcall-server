module.exports = {
  db: 'mongodb://localhost/your_project_development',
  google: {
    consumerKey:
'267057860316-qjdth18861rb2h8j4pnsupv03pipjagq.apps.googleusercontent.com',
    consumerSecret: 'd1SHrhiP_-jS1SITy46gwK5t',
    callbackURL: 'http://quickcall-server.herokuapp.com/auth/google/callback',
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
