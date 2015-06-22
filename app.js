var koa = require('koa');
var render = require('koa-ejs');
var serve = require('koa-static');
var path = require('path');
var app = koa();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(serve(path.join(__dirname, 'public')));

app.use(function *() {
  yield this.render('start');
});


app.listen(3000);
console.log('App is now serving on port 3000');
