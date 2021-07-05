const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mcqSchema = new Schema({
    t_id: {
        type: String
    },
    question:{
      type:String
    },
    yes:{
      type:Array
    },
    no:{
      type:Array
    }
}, {timestamps: true});

const Mcq = mongoose.model('Mcq', mcqSchema);

module.exports = Mcq;