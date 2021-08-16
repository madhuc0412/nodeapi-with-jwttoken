const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const config = require('./config/config')();

const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');


const app = express();

const router = express.Router();

app.use(express.json());       // application/json
app.use(express.urlencoded({
  extended: true
}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/', (req, res) => res.send('App is working'));


console.log(config.PortNo);



router.use('/auth', authRoutes);
router.use('/user', userRoutes);



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



app.listen(config.PortNo, config.HostURL, () => {
  console.log(`App listening at http://${config.HostURL}:${config.PortNo}`)
})