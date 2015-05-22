UniNet
=======================

[Live here: http://uninet.biz/](http://uninet.biz/)

Intro
--------
UniNet este o retea de socializare creata pentru universitati. Aceasta le ofera studentilor:
- Posibilitate de postare anunturi, notite etc.
- Un **feed** unde pot urmari postarile celorlalti
- Pagina **Conversations** unde pot avea conversatii cu alti utilizatori (pentru a intra in conversatie cu cineva: 1) click pe
numele persoanei pe pagina de Feed sau 2) cauta-i numele in dreapta pe pagina **Conversations**)
- **Social Events** unde studentii pot anunta evenimente precum petreceri, iesiri in oras, intalniri de studiu
- **Roommate finder** pentru a-si gasi usor colegi de camera, pe baza intereselor comune
- **Veteran help center** ajutor pentru boboci de la studentii mai mari
- **Book Bazaar** pentru ca studentii sa poate vinde si cumpara carti intre ei
- **Peer Workout**: stim cu totii ca studentii sunt lenesi. Se pot ingrasa din cauza stresului si alimentatiei nesanatoase, si nu fac sport.
Peer Workout ii ajuta sa nu mai amane inotul, alergatul, sau orice sport in felul urmator: studentii creeaza o intalnire, la o anumita ora,
cu un anumit grup de prieteni. Acestea nu pot fi amanate, iar efectul psihologic este de peer-pressure: e mai putin probabil sa nu mai vii cand
prietenii tai te asteapta. *Nu am implementat inca*
- **Points Of Interest** le arata studentilor punctele de interest din jurul lor, cum ar fi: restaurante, sali de sport, parcuri etc. *Nu am implementat inca*

Features
--------

- Autentificare locala cu Email si Parola
- Proiect structurat MVC (Model-View-Controller)
- Posibilitate de rulare in cluster Node.js (pentru a rula serverul pe mai multe nuclee ale procesorului)
- Stylesheet-urile scrise in LESS
- HTML-urile scris in Jade
- Design Frontend: Bootstrap 3 cu Material Design
- Angular.js ca frontend framework
- Administrare Cont
 - Gravatar
 - Detalii Profil
 - Schimbare Parola
 - Resetare Parola
- Protectie atacuri CSRF
- Baza de date document-based: MongoDB
- Conexiunea dintre backend si frontend pentru pagina de chat realizata prin WebSockets (cu socket.io)

Necesare pentru rulare:
-------------

- [MongoDB](http://www.mongodb.org/downloads)
- [Node.js](http://nodejs.org)

**Note:** If you are new to Node or Express, I recommend to watch
[Node.js and Express 101](http://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

Build
---------------

```bash
# Make sure you have a MongoDB instance running
$ mongod

# Install the NPM dependencies
$ npm install

# Load some faculties in the DB. Necessary only the first time the DB is created.
$ node test-data.js

# Run the app; it'll be available at http://localhost:3000
$ node app.js
```

Structura proiect
-----------------

| Name                               | Description                                                 |
| ---------------------------------- |:-----------------------------------------------------------:|
| **config**/passport.js             | Passport Local strategies, plus login middleware.           |
| **config**/secrets.js              | API keys, tokens, passwords and database URL.               |
| **controllers**/*.js               | App controllers for api routes.                             |
| **models**/*.js                    | Mongoose schemas and models.                                |
| **public**/                        | Static assets (fonts, css, js, img).                        |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                |
| **public**/**js**/main.js          | Client-side JavaScript here.                                |
| **public**/**css**/main.less       | Main stylesheet for the app.                                |
| **public/css/themes**/default.less | Some Bootstrap overrides to make it look prettier.          |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.     |
| **views/partials**/flash.jade      | Error, info and success flash notifications.                |
| **views/partials**/header.jade     | Navbar partial template.                                    |
| **views/partials**/footer.jade     | Footer partial template.                                    |
| **views**/layout.jade              | Base template.                                              |
| **views**/home.jade                | Home page template.                                         |
| app.js                             | Main application file.                                      |

Lista de module folosite
------------------------

| Package                         | Description   |
| ------------------------------- |:-------------:|
| async                           | Utility library that provides asynchronous control flow. |
| bcrypt-nodejs                   | Library for hashing and salting user passwords. |
| cheerio                         | Scrape web pages using jQuery-style syntax.  |
| clockwork                       | Clockwork SMS API library. |
| connect-assets                  | Compiles LESS stylesheets, concatenates & minifies JavaScript. |
| connect-mongo                   | MongoDB session store for Express. |
| csso                            | Dependency for connect-assets library to minify CSS. |
| express                         | Node.js web framework. |
| body-parser                     | Express 4.0 middleware. |
| cookie-parser                   | Express 4.0 middleware. |
| express-session                 | Express 4.0 middleware. |
| morgan                          | Express 4.0 middleware. |
| compression                     | Express 4.0 middleware. |
| errorhandler                    | Express 4.0 middleware. |
| method-override                 | Express 4.0 middleware. |
| express-flash                   | Provides flash messages for Express. |
| express-validator               | Easy form validation for Express. |
| fbgraph                         | Facebook Graph API library. |
| github-api                      | GitHub API library. |
| jade                            | Template engine for Express. |
| lastfm                          | Last.fm API library. |
| instagram-node                  | Instagram API library. |
| less                            | LESS compiler. Used implicitly by connect-assets. |
| lob                             | Lob API library |
| lusca                           | CSRF middleware.        |
| mongoose                        | MongoDB ODM. |
| node-foursquare                 | Foursquare API library. |
| node-linkedin                   | LinkedIn API library. |
| nodemailer                      | Node.js library for sending emails. |
| passport                        | Simple and elegant authentication library for node.js |
| passport-facebook               | Sign-in with Facebook plugin. |
| passport-github                 | Sign-in with GitHub plugin. |
| passport-google-oauth           | Sign-in with Google plugin. |
| passport-twitter                | Sign-in with Twitter plugin. |
| passport-instagram              | Sign-in with Instagram plugin. |
| passport-local                  | Sign-in with Username and Password plugin. |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin. |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies. |
| request                         | Simplified HTTP request library. |
| stripe                          | Offical Stripe API library. |
| tumblr.js                       | Tumblr API library. |
| twilio                          | Twilio API library. |
| twit                            | Twitter API library. |
| lodash                          | Handy JavaScript utlities library. |
| uglify-js                       | Dependency for connect-assets library to minify JS. |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**. |
| mocha                           | Test framework. |
| chai                            | BDD/TDD assertion library. |
| supertest                       | HTTP assertion library. |
| multiline                       | Multi-line strings for the generator. |
| blessed                         | Interactive command line interface for the generator. |
| yui                             | Used by the Yahoo API example. |

Extra
-------

You need to have a MongoDB server running before launching `app.js`. You can
download MongoDB [here](mongodb.org/downloads), or install it via a package manager.
<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">
Windows users, read [Install MongoDB on Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

**Tip:** If you are always connected to the internet, you could just use
[MongoLab](https://mongolab.com/) or [Compose](https://www.compose.io/) instead
of downloading and installing MongoDB locally. You will only need to update the
`db` property in `config/secrets.js`.

Deployment
----------

Once you are ready to deploy your app, you will need to create an account with
a cloud platform to host it. These are not the only choices, but they are my top
picks. From my experience, **Heroku** is the easiest to get started with, it will
automatically restart your Node.js process when it crashes, zero-downtime
deployments and custom domain support on free accounts. Additionally, you can
create an account with **MongoLab** and then pick one of the *4* providers below.
Again, there are plenty of other choices and you are not limited to just the ones
listed below.

### 1-Step Deployment with Heroku

<img src="http://blog.exadel.com/wp-content/uploads/2013/10/heroku-Logo-1.jpg" width="200">
- Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/)
- In terminal, run `heroku login` and enter your Heroku credentials
- From *your app* directory run `heroku create`
- Run `heroku addons:add mongolab` to set up Mongo and configure your environment variables
- Lastly, do `git push heroku master`.  Done!

**Note:** To install Heroku add-ons your account must be verified.

---

<img src="http://i.imgur.com/7KnCa5a.png" width="200">
- Open [mongolab.com](https://mongolab.com) website
- Click the yellow **Sign up** button
- Fill in your user information then hit **Create account**
- From the dashboard, click on **:zap:Create new** button
- Select **any** cloud provider (I usually go with AWS)
- Under *Plan* click on **Single-node (development)** tab and select **Sandbox** (it's free)
 - *Leave MongoDB version as is - `2.4.x`*
- Enter *Database name** for your web app
- Then click on **:zap:Create new MongoDB deployment** button
- Now, to access your database you need to create a DB user
- Click to the recently created database
- You should see the following message:
 - *A database user is required to connect to this database.* **Click here** *to create a new one.*
- Click the link and fill in **DB Username** and **DB Password** fields
- Finally, in `secrets.js` instead of `db: 'localhost'`, use the following URI with your credentials:
 - `db: 'mongodb://USERNAME:PASSWORD@ds027479.mongolab.com:27479/DATABASE_NAME'`

**Note:** As an alternative to MongoLab, there is also [Compose](https://www.compose.io/).


<img src="http://www.opencloudconf.com/images/openshift_logo.png" width="200">
- First, install this Ruby gem: `sudo gem install rhc` :gem:
- Run `rhc login` and enter your OpenShift credentials
- From *your app* directory run `rhc app create MyApp nodejs-0.10`
 - **Note:** *MyApp* is what you want to name your app (no spaces)
- Once that is done, you will be provided with **URL**, **SSH** and **Git Remote** links
- Visit that **URL** and you should see *Welcome to your Node.js application on OpenShift* page
- Copy **Git Remote** and paste it into `git remote add openshift your_git_remote`
- Before you push your app, you need to do a few modifications to your code

Add these two lines to `app.js`, just place them anywhere before `app.listen()`:
```js
var IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
```

Then change `app.listen()` to:
```js
app.listen(PORT, IP_ADDRESS, function() {
  console.log("✔ Express server listening on port %d in %s mode", PORT, app.settings.env);
});
```
Add this to `package.json`, after *name* and *version*. This is necessary because, by default, OpenShift looks for `server.js` file. And by specifying `supervisor app.js` it will automatically restart the server when node.js process crashes.

```js
"main": "app.js",
"scripts": {
  "start": "supervisor app.js"
},
```

- Finally, now you can push your code to OpenShift by running `git push -f openshift master`
 - **Note:** The first time you run this command, you have to pass `-f` (force) flag because OpenShift creates a dummy server with the welcome page when you create a new Node.js app. Passing `-f` flag will override everything with your *Hackathon Starter* project repository. Please **do not** do `git pull` as it will create unnecessary merge conflicts.
- And you are done!

<img src="http://upload.wikimedia.org/wikipedia/commons/f/ff/Windows_Azure_logo.png" width="200">

- Login to [Windows Azure Management Portal](http://manage.windowsazure.com/)
- Click the **+ NEW** button on the bottom left of the portal
- Click **WEB SITE**, then **QUICK CREATE**
- Enter a name for **URL** and select the datacenter **REGION** for your web site
- Click on **CREATE WEB SITE** button
- Once the web site status changes to *Running*, click on the name of the web site to access the Dashboard
- At the bottom right of the Quickstart page, select **Set up a deployment from source control**
- Select **Local Git repository** from the list, and then click the arrow
- To enable Git publishing, Azure will ask you to create a user name and password
- Once the Git repository is ready, you will be presented with a **GIT URL**
- Inside your *Hackathon Starter* directory, run `git remote add azure [Azure Git URL]`
- To push your changes simply run `git push azure master`
 - **Note:** *You will be prompted for the password you created earlier*
- On **Deployments** tab of your Windows Azure Web Site, you will see the deployment history

<img src="http://www.comparethecloud.net/wp-content/uploads/2014/06/ibm-bluemix_pr-030514.jpg" width="200">

- Go to [Codename: Bluemix](http://bluemix.net) to signup for the free trial, or login with your *IBM id*
- Install [Cloud Foundry CLI](https://github.com/cloudfoundry/cli)
- Navigate to your **hackathon-starter** directory and then run `cf push [your-app-name] -m 512m` command to deploy the application
 - **Note:** You must specify a unique application name in place of `[your-app-name]`
- Run `cf create-service mongodb 100 [your-service-name]` to create a [MongoDB service](https://www.ng.bluemix.net/docs/#services/MongoDB/index.html#MongoDB)
- Run `cf bind-service [your-app-name] [your-service-name]` to associate your application with a service created above
- Run `cf files [your-app-name] logs/env.log` to see the *environment variables created for MongoDB.
- Copy the **MongoDB URI** that should look something like the following: `mongodb://68638358-a3c6-42a1-bae9-645b607d55e8:46fb97e6-5ce7-4146-9a5d-d623c64ff1fe@192.155.243.23:10123/db`
- Then set it as an environment variable for your application by running `cf set-env [your-app-name] MONGODB [your-mongodb-uri]`
- Run `cf restart [your-app-name]` for the changes to take effect.
- Visit your starter app at **http://[your-app-name].ng.bluemix.net**
- Done!

**Note:** Alternative directions, including how to setup the project with a DevOps pipeline are available at [http://ibm.biz/hackstart](http://ibm.biz/hackstart).
A longer version of these instructions with screenshots is available at [http://ibm.biz/hackstart2](http://ibm.biz/hackstart2).
Also, be sure to check out the [Jump-start your hackathon efforts with DevOps Services and Bluemix](https://www.youtube.com/watch?v=twvyqRnutss) video.
