const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on ${port}`)
});


app.get('/api/v1/senators', (request, response) => {
  database('senators').select()
  .then((senators) => {
    response.status(200).json(senators);
  })
  .catch(error => {
    response.status(404).send(error)
  })
})