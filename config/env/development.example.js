module.exports = {
    db: 'mongodb://localhost/yourProject',
    // add your credentials but use .gitignore to exclude them from git tree
    // even better, you can run EXPORT key=value on your shell run time
    google: {
        consumerKey: '',
        consumerSecret: '',
        callbackURL: '',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    },
    plivo: {
        "authId": '',
        "authToken": ''
    }
};
