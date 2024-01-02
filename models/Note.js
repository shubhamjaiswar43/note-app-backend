const mongoose = require('mongoose');
const {Schema} = mongoose;
const NoteSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        default:"General"

    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    lastModification:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('note',NoteSchema);