const mongo = require('mongoose');

const url = process.env.MONGO_DB_URI;

// FIXME: dev debug log, remove it
console.log(`connecting to ${url}`);

mongo.connect(url)
    .then(() => console.log('connected to a datebase.'))
    .catch((error) => console.log('failed to connect to a database due to ', error));

const personSchema = new mongo.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (_, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongo.model('Person', personSchema);