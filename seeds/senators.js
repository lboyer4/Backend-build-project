const senators = require('../data.js')
const states = require('../states.js')

exports.seed = function(knex) {
  return knex('senators').del()

  .then(() => {
    console.log('something')
    knex('states').del();
  })
  .then(() => {
    return knex('states').insert(states)
  })
  .then(() => {
      return Promise.all(
        senators.map(senator => {
          let {first_name, last_name, party, state_name} = senator;
          return knex('states').where('name', state_name).select('id').first()
          .then(stateRecord => {
            return knex('senators').insert({first_name, last_name, party, state_id: stateRecord.id})
          })
        })
      )
    })
};

// const createSenator = (knex, senator, state) => {
//   return knex('states').where('name', state).first()
//   .then((stateRecord) => {
//     return knex('senators').insert({
//       first_name: senator.first_name,
//       last_name: senator.last_name,
//       party: senator.party,
//       state_id: stateRecord.id
//     });
//   });
// };

