const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.listen(process.env.PORT || port, () => {
  console.log(`App is running on ${port}`)
});

app.get('/', function(req, res) {
	res.status(200).json('hello')
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

app.get('/api/v1/states', (request, response) => {
  database('states').select()
  .then((states) => {
    response.status(200).json(states);
  })
  .catch(error => {
    response.status(404).send(error)
  })
})

app.get('/api/v1/senator/:id', (request, response) => {
  database('senators').where('id', request.params.id).select()
  .then((senator) => {
    response.status(200).json(senator);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/state/:id', (request, response) => {
  database('states').where('id', request.params.id).select()
  .then((state) => {
    response.status(200).json(state);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/senators', (request, response) => {
  const senator = request.body;
  for (let requiredParameter of ['party', 'first_name', 'last_name', 'state_name']) {
    if (!senator[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  let newSenator = {
  	party: senator.party,
  	first_name: senator.first_name,
  	last_name: senator.last_name
  }
  	database('states').where({name: senator.state_name}).select('id')

  	.then(stateId => database('senators').insert({...newSenator, state_id: stateId[0].id}, "id")
  	.then(senatorId => {
      response.status(201).json({ id: senatorId[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    }))
});

app.post('/api/v1/states', (request, response) => {
	const state = request.body;

	for (let requiredParameter of ['name', 'abreviation']) {
		if(!state[requiredParameter]) {
			return response
				.status(422)
				.send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.`});
		}
	}

	database('states').insert(state, 'id')
		.then(state => {
			response.status(201).json({id: state[0] })
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.delete('/api/v1/senators/:id', (request, response) => {
	database('senators').where({ id: request.params.id}).del()
	.then(()=> {
		response.status(201).json({success: true})
	})
	.catch(error => {
			response.status(500).json({ error });
		});

});