const mongo = require('mongoose');

if (process.argv.length < 3) {
  console.log('Missing password. Unable to connecto to a database.');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.bas7hko.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongo.Schema({
  name: String,
  number: String,
  id: Number
});

const Person = mongo.model('Person', personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  mongo
    .connect(url)
    .then(() => {
      console.log('connected.');
      const person = new Person({
        name: name,
        number: number,
        // TODO: remove this code duplicate (we use the same way to generate id in our backend)
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      });
      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      return mongo.connection.close();
    })
    .catch((error) => {
      console.log('failed to save person info due to ', error);
    });
} else {
  mongo
    .connect(url)
    .then(() => {
      Person.find({}).then((result) => {
        result.forEach(personData => {
          console.log(`${personData.name} ${personData.number}`);
        });
        mongo.connection.close();
      });
    })
    .catch((err) => console.log('failed to fetch data due to ', err));
}
