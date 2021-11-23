const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    },
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
});

const restaurnatSchema = new Schema({
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
  dishes: {
    type: [dish],
    // required: true
  },
  addressLine: {
    type: String,
    // required: true
  },
  city:  {
    type:String,
    // required: true
},
  state: {
    type: Number,
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
  delievryMode: {
    type: String,
    // required: true
  },
  phoneNo:  {
    type:Number,
    // required: true
},
refreshToken: {
    type: [Session],
  }
});

restaurnatSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })

restaurnatSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Restaurant", restaurnatSchema);
