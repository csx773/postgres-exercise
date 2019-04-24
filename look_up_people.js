const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//get arguments from console
var findName = process.argv[2];

//string to query select to SQL database
const query = {
    text: 'SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1',
    values: [findName]
}
  
client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    //callback function
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            if (result.rows.length === 0){
                console.log(`Error, person: ${findName} not found. Please try again.`)
                client.end();
            }
            console.log(`Found ${result.rows.length} person(s) by the name: ${findName}`)
            result.rows.forEach( (person) =>{
                let firstName = person.first_name;
                let lastName = person.last_name;
                let birthday = person.birthdate.toString().slice(4,15)
                console.log(`${firstName} ${lastName}, born ${birthday}`);
                client.end();
            });
        }
    })
});
  