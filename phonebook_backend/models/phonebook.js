const mongo = require('mongoose');

const personSchema = new mongo.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (value) => {
        const numberFormat = /^[0-9]{2,3}-[0-9]+/;
        return value.match(numberFormat);
      },
      message: (props) => {
        return `Number must be length 8 and follow these patterns 12-345678 or 123-45678, but got ${props.value}`;
      }
    }
  },
});

personSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongo.model('Person', personSchema);