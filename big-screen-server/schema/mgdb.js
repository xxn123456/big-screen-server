const { Schema } = require('../config/coon');
const mongoose = require('../config/coon');
let personSchema = new mongoose.Schema({
    name: String,
    age: {
      type:Number,
      default:0
  },
    class_id:{
      type:Schema.Types.ObjectId
    }
    
})

personSchema.statics.findByName = function(name, cb) {
    return this.find({
      "name": name
    },cb)
  }

const Person = mongoose.model('person', personSchema,'person')

module.exports = Person



