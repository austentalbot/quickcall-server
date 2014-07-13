module.exports = {
  db: 'mongodb://localhost/your_project_development',
  google: {
    consumerKey: process.env.google_client_id,
    consumerSecret: process.env.google_client_secret,
    callbackURL: process.env.google_callback,
    scope: [
      'https://www.googleapis.com/oauth2/v1/userinfo'
    ]
  },
  plivo: {
    "authId": process.env.plivo_auth_id,
    "authToken": process.env.plivo_auth_token
  }
};
