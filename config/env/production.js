module.exports = {
    db: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/quickcall',
    google: {
        clientID: process.env.google_client_id,
        clientSecret: process.env.google_client_secret,
        callbackURL: process.env.google_callback,
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    },
    plivo: {
        "authId": process.env.plivo_auth_id,
        "authToken": process.env.plivo_auth_token
    }
};
