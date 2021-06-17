const Koa = require('koa');
const app = new Koa();

const { loadFile } = require('./src/lib/utils/index')

const init = require('./src/middleware/init')
const bodyParser = require('./src/middleware/bodyParser')
const router = require('./src/middleware/router')
const render = require('./src/middleware/render')
const renderJson = require('./src/middleware/renderJson')
const compress = require('./src/middleware/compress')
const helmet = require('./src/middleware/helmet')
const error = require('./src/middleware/error')
const cacheControl = require('./src/middleware/cacheControl')
const static = require('./src/middleware/static')
const logger = require('./src/middleware/logger')
const bundle = require('./src/middleware/bundle')

app.use(init());
app.use(bundle());
app.use(logger());
app.use(error());
app.use(static());
app.use(bodyParser());
app.use(renderJson());
app.use(render());
app.use(router(loadFile('../../routes/index.js')));
app.use(compress());
app.use(helmet());
app.use(cacheControl({maxAge:120}));



app.listen(8080);