const senators = require('../data.js')
const states = require('../states.js')

exports.seed = function(knex) {
  return knex('senators').del()
  .then(() => {
    return knex('states').del();
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
  // .then(() => {
  //   let senatorPromises = [];
  //   senators.forEach((senator) => {
  //     let state = senator.state_name;
  //     senatorPromises.push(createSenator(knex, senator, state));
  //   });

  //   return Promise.all(senatorPromises);
  // });
};

const createSenator = (knex, senator, state) => {
  return knex('states').where('name', state).first()
  .then((stateRecord) => {
    return knex('senators').insert({
      first_name: senator.first_name,
      last_name: senator.last_name,
      party: senator.party,
      state_id: stateRecord.id
    });
  });
};



// const createStates = (knex, state) => {
//   return knex('states').insert({
//     name: state.name,
//     abreviation: state.abreviation
//   }, 'id')
//   .then(stateId => {
//     let senatorPromises = [];

//     state.senators.forEach(senator => {
//       senatorPromises.push(
//         createSenator(knex, {
//           first_name: senator.first_name,
//           last_name: senator.last_name,
//           party: senator.party,
//           state_id: stateId[0]
//         })
//       )
//     })
//     return Promise.all(senatorPromises);
//     });

//   };

// // const createSenator = (knex, senator) => {
// //   return knex('senators').insert({
// //     first_name: senator.first_name,
// //     last_name: senator.last_name,
// //     party: senator.party,
// //     state_id: 
// // };

// exports.seed = function(knex) {
//   return knex('senators').del()
//     .then(() => knex('states').del())
//     .then(() => {
//       let statePromises = []

//       sen.forEach(senator => {
//         statePromises.push(createStates(knex, senator))
//       });

//       return Promise.all(statePromises)
//     })
//   .catch(error => console.log('error happened'))
      
// };
