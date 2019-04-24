
const settings = require('./settings.json')

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password: settings.password,
      database : settings.database,
    }
});
  
//get arguments from console
const addFirstName = process.argv[2];
const addLastName = process.argv[3];
const addDOB = process.argv[4];


function addPerson ( firstName, lastName, birthday){
    console.log('Inside add person function')
    console.log(`${firstName}, ${lastName}, ${birthday}`)
    knex('famous_people').insert({
        'first_name': firstName, 
        'last_name': lastName,
        'birthdate': birthday
    })
    .finally(function (){
        knex.destroy();
    })
}

addPerson(addFirstName, addLastName, addDOB);
