const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    },
  });
  const Favs =  new Schema({
    restaurant:{
      type:String,

    }
  })

const dish = new Schema({
dishName: {
  type: String,
  // required: true
},
ingredients: {
  type: String,
  // required: true
},
// image: {
//   type: String,
//   // required: true
// },
price: {
  type: Number,
  // required: true
},
description: {
  type: String,
  // required: true
},
category: {
  type: String,
  // required: true
},
});
const userSchema = new Schema({
 
 fav:{
  type:[Favs],
 },
username: {
  type:String,
  required: true
},
password: {
  type:String,
  // required: true
},
name: {
type: String,
// required: true,
},
nickName:  {
  type:String,
  // required: true
},
imageURL: {
  type:String,
  // required: true
},
dishes: {
type: [dish],
// required: true
},
phoneNo:  {
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
city:  {
type:String,
// required: true
},
state: {
type: String,
// required: true
},
country: {
type: String,
// required: true
},
description: {
type: String,
// required: true
},
openHrs: {
type: String,
// required: true
},
  delivery:{
    type:Boolean
  },
  pickedUp:{
    type:Boolean
  },// required: true
role:{
    type:String
},
refreshToken: {
    type: [Session],
  },
})

userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })
userSchema.plugin(passportLocalMongoose);

  const User = mongoose.model('User', userSchema);
 const Dish = mongoose.model('Dish', dish);
 module.exports ={
    'Users': User,
    'Dish':Dish
 }
