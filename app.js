const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


app.use('/api/contacts', require('./routes/api/contacts'));
app.use('/api/users', require('./routes/api/users'));

app.use((req, res,) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

module.exports = app;
