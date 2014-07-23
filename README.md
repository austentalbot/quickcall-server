quick call server
-------------
a node express server which routes requests coming from the client app to Plivo.


Running locally
-------------
    npm install
    npm start

heroku will do `npm start` for you in the production environment.
The `Procfile` file is not being used but normally it's used to do what `npm start` is doing.

Setting up heroku
-------------
brew install heroku-toolbelt
heroku plugins:install git://github.com/ddollar/heroku-config.git

Deploying to heroku
-------------
    heroku login
    heroku create [your app name]
    heroku config:set NODE_ENV="production"
    heroku config:set NODE_PATH="./config:./utility"
    heroku config:push

    ** DO THIS PART ONCE **

    ssh-keygen -t rsa
    heroku keys:add

    ***********************

    git push heroku master
    heroku open
    

use `heroku logs` to debug

References
-------------
* heroku node.js guide [https://devcenter.heroku.com/articles/getting-started-with-nodejs]
* plivo API [https://www.plivo.com/docs/api/request/]