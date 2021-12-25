const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://VikasTiwari14:Tiwari%409826@cluster0.30vai.mongodb.net/CodeExecutioner?retryWrites=true&w=majority')
.then(() => {
    console.log("User Database Connection Successfull");
})
.catch((err) => {
    console.log(err);
})

const user = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    image: String,
    password: String,
    mobile: String,
    questionPosted: Array,
    questionSolved: Array,

},{
    collection: "users"
})

const userCollection = new mongoose.model('question', user);

module.exports = userCollection;