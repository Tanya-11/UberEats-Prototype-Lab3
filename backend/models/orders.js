const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const {Users} = require('./users');
// const Restaurant = require('./restaurant');

const cust =  new Schema({
  //_id: Schema.Types.ObjectId,
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    username:String
  })
const dishs = new Schema({
  _id: Schema.Types.ObjectId,
    dishName: {
      type: String,
      // required: true
    },
    ingredients: {
      type: String,
      // required: true
    },
    image: {
      type: String,
      // required: true
    },
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
    quantity:{
      type:Number
    },
  });
const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,

    orderStatus: {
        type: String,
        // required: true
      },
      customer: {
        type:cust
      },
        // required: true
     // },
      restId:{
          type:String,
      },
      dishes:{
        type:[dishs]
      },
      date:{
          type:String
      },
      deliveryMode:{
          type:String
      },
      address:{
          type:String
      },
   
      price:{
        type:Number
      },
      instructions:{
        type:String
      }
})

// const ordersSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   orders:{
//     type:orderSchema
//   }
// })



orderSchema.plugin(passportLocalMongoose);


// const Orders = mongoose.model('Orders', ordersSchema);
const Dishes = mongoose.model('Dishes', dishs);
const Order = mongoose.model('Order', orderSchema);
module.exports ={
  //  'Orders': Orders,
   'Dishes':Dishes,
   'Order':Order
}