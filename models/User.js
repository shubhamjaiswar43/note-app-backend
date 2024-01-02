const mongoose = require('mongoose');//importing the mongoose
const {Schema} = mongoose;//destructuring the Schema from mongoose (or we can directly use mongoose.Schema)
const UserSchema = new Schema({//creating a Schema Object named as UserSchema
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('user',UserSchema);//converting the Schema into model and exporting using .model(nameForThatModel,Schema Object)