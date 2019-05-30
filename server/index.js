const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
const {db} = require('./db');

app.use(morgan('dev'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use('*/imgs', express.static('public/imgs'));

//API routes
app.use('/api', require('./api'));

// any remaining requests with an extension send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// // app.listen(PORT, () =>
// //   console.log(`listening on port http://localhost:${PORT}`)
// // );

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () =>
      console.log(`listening on port http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};
init();

module.exports = app;
