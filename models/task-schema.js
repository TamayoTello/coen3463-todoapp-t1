var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird'),
    timestamps = require('mongoose-timestamp'),
    usersData = require('./user-schema');

mongoose.Promise = Promise;

var tasksDataSchema = new Schema
(
    {  name:        { type:String, default: 'Task Name' },
       owner:       {
                      type: Schema.Types.ObjectId,
                      ref: 'usersData'
                    },
       isComplete : { type : Boolean, default : false }
    },

    {
       collection: 'tasksData'
    }
);

tasksDataSchema.plugin(timestamps);

module.exports = mongoose.model('tasksData', tasksDataSchema);