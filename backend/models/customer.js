const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Restaurant = require('./restaurant');

const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    },
  })

  const Favs =  new Schema({
    fav:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  })

 const customerSchema = new Schema({
     username: {
         type:String,
         required: true
     },
     name: {
        type:String,
        // required: true
    },
     nickName:  {
        type:String,
        // required: true
    },
     phone:  {
        type:Number,
        // required: true
    },
     addressLine1:  {
        type:String,
        // required: true
    },
     addressLine2:  {
        type:String,
        // required: true
    },
     city: {
        type:String,
            // required: true
    },
     state:  {
        type:String,
        // required: true
    },
     imageURL: {
        type:String,
        // required: true
    },
     password: {
        type:String,
        // required: true
    },
    fav:{
     type:[Favs],
    },
    refreshToken: {
        type: [Session],
      },

 });

 customerSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })
  

 customerSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model('Customer', customerSchema);
