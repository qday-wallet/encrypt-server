const Koa = require('koa');
const logger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./router');

const app = new Koa();

app.use(logger());

app.use(koaBody());

app.use(router.routes());

app.listen(4000);
