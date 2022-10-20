const router = require('express').Router();

const Home = require('./routes/home');

const Login = require('./routes/login');
const addList = require('./routes/addlist');
// const Register = require('./routes/register');

const Tools = require('./routes/tools');

const Servers = require('./routes/servers');

router.use('/', Home);

router.use('/login', Login);
router.use('/addlist', addList);
// router.use('/register', Register);

router.use('/tools', Tools);

router.use('/servers', Servers);

module.exports = router;
