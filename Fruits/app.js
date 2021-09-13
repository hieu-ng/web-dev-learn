//hshint esversion:6

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A fruit must have a name!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
})

const Fruit = mongoose.model("Fruit", fruitsSchema)

const fruit = new Fruit({
    name: "Mango",
    rating: 3,
    review: "sour fruit"
})

fruit.save()
// Fruit.updateOne({ _id: "613d623039a8c8e4051edba6" }, { name: "Peach" }, (err) => {
//     if (err) console.log(err)
//     else console.log('Updated')
// })
Fruit.find((err, fruits) => {
    if (err) console.log(err)
    else {
        // mongoose.connection.close()
        console.log(fruits.map(fruit => fruit.name))
    }
})
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitsSchema,
})

const Person = mongoose.model("Person", personSchema)
Person.updateOne({ _id: "613d6324f673081b19e467c5" }, {
    favoriteFruit: fruit
}, (err) => {
    if (err) console.log(err)
    else console.log('Updated')
})
// const person = new Person({
//     name: "Hieu",
//     age: 26,
// })

// person.save()

