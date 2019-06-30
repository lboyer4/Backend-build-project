const environment = process.env.NODE_ENV || 'development';
//attaches knexfile
const configuration = require('./knexfile')[environment];
//uses knex so you can just say database
const database = require('knex')(configuration);

//brings in express
const express = require('express');

//port chosen to run on
const port = 3000;

//app uses express
const app = express();

//translates to json
app.use(express.json());

//determines which port  to run on
app.listen(process.env.PORT || port, () => {
  console.log(`App is running on ${port}`)
});

//get request on home path
app.get('/', function(req, res) {
	//returns the string hello if successful
	res.status(200).json('hello')
 });

//get request for all senators
app.get('/api/v1/senators', (request, response) => {
	//grabs senators from the senator database
  database('senators').select()
  .then((senators) => {
  	//returns all senators if successful
    response.status(200).json(senators);
  })
  .catch(error => {
  	//returns an error if unsuccessful
    response.status(500).send(error)
  })
})

//get request for all states
app.get('/api/v1/states', (request, response) => {
	//grabs the states from the state database
  database('states').select()
  .then((states) => {
  	//returns all states if successful
    response.status(200).json(states);
  })
  .catch(error => {
  	//returns an error if unsuccesful
    response.status(500).send(error)
  })
})

//get request for a specific senator
app.get('/api/v1/senator/:id', (request, response) => {
	//goes in to the senator database and selects the senator with an id that matches the id in the request
  database('senators').where('id', request.params.id).select()
  .then((senator) => {
  	//returns a specific senator
    response.status(200).json(senator);
  })
  .catch((error) => {
  	//returns an error
    response.status(500).json({ error });
  });
});

//get request for specific state
app.get('/api/v1/state/:id', (request, response) => {
	//goes in to the states database and selects the state that has an id that matches the request id
  database('states').where('id', request.params.id).select()
  .then((state) => {
  	//returns that specific state
    response.status(200).json(state);
  })
  .catch((error) => {
  	//returns an error
    response.status(500).json({ error });
  });
});

//posts to the senators database
app.post('/api/v1/senators', (request, response) => {
	//senator is assigned the body of the request
  const senator = request.body;
  //determines required parameters
  for (let requiredParameter of ['party', 'first_name', 'last_name', 'state_name']) {
  	//if a required parameter isnt passed in an error is thrown say which one is missing
    if (!senator[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  //creates a new senator with required parameters
  let newSenator = {
  	party: senator.party,
  	first_name: senator.first_name,
  	last_name: senator.last_name
  }
  //goes in to the states database to find the state id that matches the state name passed in in the request
  	database('states').where({name: senator.state_name}).select('id')
  	//spreads the new senator and adds in the state id that was found
  	.then(stateId => database('senators').insert({
  		...newSenator, state_id: stateId[0].id}, "id")
  	.then(senatorId => {
  		//returns the new senator
      response.status(201).json({ id: senatorId[0] })
    })
    .catch(error => {
    	//error that is thrown
      response.status(500).json({ error });
    }))
});

//post request for a new state
app.post('/api/v1/states', (request, response) => {
	//state is assigned the request body
	const state = request.body;

	//required parameters are determined
	for (let requiredParameter of ['name', 'abreviation']) {
		//if missing required parameter an error is thrown
		if(!state[requiredParameter]) {
			return response
				.status(422)
				.send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.`});
		}
	}

	//adds a new id for the new state
	database('states').insert(state, 'id')
		.then(state => {
			//returns the new state
			response.status(201).json({id: state[0] })
		})
		.catch(error => {
			//throws an error
			response.status(500).json({ error });
		});
});

//delete request for specific senator
app.delete('/api/v1/senators/:id', (request, response) => {
	//goes in to the senator database and finds the one with an id that matches the request id and then it deletes it
	database('senators').where({ id: request.params.id}).del()
	.then(()=> {
		//returns success: true if the response is okay
		response.status(201).json({success: true})
	})
	.catch(error => {
		//throws an error if soemthing went wrong
			response.status(500).json({ error });
		});

});