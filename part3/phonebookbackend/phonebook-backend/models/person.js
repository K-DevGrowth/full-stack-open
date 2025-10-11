const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
    .connect(url)
    .then(result => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log("Error connecting to MongoDB: ", error.message);
    })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema);

//const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

//const password = process.argv[2]

//const url = `mongodb+srv://khoidang01234:${password}@cluster0.u6v6rxh.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery', false)

// mongoose.connect(url)

// const phonebookSchema = new mongoose.Schema({
//     id: Number,
//     name: String,
//     number: String,
// })

//const Phonebook = mongoose.model('Phonebook', phonebookSchema);

// if (process.argv.length === 5) {
//     const name = process.argv[3]
//     const number = process.argv[4]

//     const newPhonebook = new Phonebook({
//         name: name,
//         number: number,
//     })

//     newPhonebook.save().then(() => {
//         console.log(`added ${name} number ${number} to phonebook`)
//         mongoose.connection.close()
//     })
// }

// if (process.argv.length === 3) {
//     Phonebook.find({}).then((result) => {
//         result.forEach(item => {
//             console.log(item)
//         })
//         mongoose.connection.close()
//     })
// }

