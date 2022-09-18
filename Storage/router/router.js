const router = require('express').Router();

const Home = require('./routes/home');
const Login = require('./routes/login');
const Tools = require('./routes/tools');
const Servers = require('./routes/servers');
const EServers = require('./routes/eservers');

router.use('/', Home);
router.use('/login', Login);
router.use('/tools', Tools)
router.use('/servers', Servers);
router.use('/eservers', EServers);

module.exports = router;
