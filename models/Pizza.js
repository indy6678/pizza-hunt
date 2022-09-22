// import schema constructor and model function
const {Schema, model} = require('mongoose')

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [] // indicates an array; will also accept "array" instead of brackets
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the Pizza model
module.exports = Pizza;