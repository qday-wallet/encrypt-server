const router = require('koa-router')();
const handles = require('../handles');

router.get('/account', handles.account);
router.get('/tx', handles.tx);
router.post('/stakeTx', handles.stakeTx);
router.post('/encryptTx', handles.encryptTx);

module.exports = router;
