var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Promise = require('bluebird'),
    timestamps = require('mongoose-timestamp'),
    tasksData = require('./task-schema');

mongoose.Promise = Promise;

var usersDataSchema = new Schema
(
     {  username:  { type: String, required: true },
        email:     { type: String, required: true },
        firstName: String,
        lastName:  String,
        tasks:     [{
                      type: Schema.Types.ObjectId,
                      ref: 'tasksData'
                   }]
     },

     {
        collection: 'usersData'
     }
);

usersDataSchema.plugin(passportLocalMongoose);
usersDataSchema.plugin(timestamps);

module.exports = mongoose.model('usersData', usersDataSchema);