const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl : { rejectUnauthorized: false}
        //   host : '127.0.0.1',
        //   user : 'postgres',
        //   password : 'test',
        //   database : 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.send('it is working!')})

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => {image.handleImage(req, res, knex)})

app.post('/imageurl', image.handleApiCall)

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running'); 
})

