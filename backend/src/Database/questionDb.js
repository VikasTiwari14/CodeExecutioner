const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://VikasTiwari14:Tiwari%409826@cluster0.30vai.mongodb.net/CodeExecutioner?retryWrites=true&w=majority')
.then(() => {
    console.log("Question Database Connection Successfull");
})
.catch((err) => {
    console.log(err);
})

const question = new mongoose.Schema({
    id: Number,
    link : String,
    comment : String,
    postedAt : String,
    label: String,
    solved : {
        type: Boolean,
        default: false
    },
    author: Object,
    solution : {
        type: Array,
        default: []
    }
},{
    collection: "questions"
})

const questionCollection = mongoose.models.questions || mongoose.model('questions', question);

module.exports = questionCollection;