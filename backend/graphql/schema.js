const graphql = require("graphql");
const { Dishes, Order } = require("../models/orders");
const { Users } = require("../models/users");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean,
} = graphql;

const FavType = new GraphQLObjectType({
  name: "fav",
  fields: () => ({
    restaurant: { type: GraphQLString },
  }),
});
const DishType = new GraphQLObjectType({
    name: "Dish",
    //We are wrapping fields in the function as we dont want to execute this ultil
    //everything is inilized. For example below code will throw error AuthorType not
    //found if not wrapped in a function
    fields: () => ({
      id: { type: GraphQLID },
      dishName: { type: GraphQLString },
      ingredients: { type: GraphQLString },
      image: { type: GraphQLString },
      description: { type: GraphQLString },
      category: { type: GraphQLString },
      quantity: { type: GraphQLFloat },
      price: { type: GraphQLFloat },
      // orders: {
      // type: AuthorType,
      // resolve(parent, args) {
      //     return Author.findById(parent.authorID);
      // }
      // }
    }),
  });
const UserType = new GraphQLObjectType({
  name: "Users",

  fields: () => ({
    fav: { type: new GraphQLList(FavType)},
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    nickName: { type: GraphQLString },
    imageURL: { type: GraphQLString },
   dishes:{type : new GraphQLList(DishType)},
    phoneNo: { type: GraphQLInt },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    description: { type: GraphQLString },
    openHrs: { type: GraphQLString },
    delivery: { type: GraphQLBoolean },
    pickedUp: { type: GraphQLBoolean },
    role: { type: GraphQLString },
    // orders: {
    // type: AuthorType,
    // resolve(parent, args) {
    //     return Author.findById(parent.authorID);
    // }
    // }
  }),
});



const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    orderStatus: { type: GraphQLString },
    customer: {type:UserType},
    restId: { type: GraphQLString },
    dishes: { type: DishType },
    date: { type: GraphQLString },
    deliveryMode: { type: GraphQLString },
    address: { type: GraphQLString },
    instructions: { type: GraphQLString },

    price: { type: GraphQLFloat },
    // orders: {
    // type: AuthorType,
    // resolve(parent, args) {
    //     return Author.findById(parent.authorID);
    // }
    //  }
  }),
});

// const RestaurantType = new GraphQLObjectType({
//     name:"Restaurant",
//     fields:()=>({
//         username: { type: GraphQLString },
//         password: { type: GraphQLString },
//     name: { type: GraphQLString },
//     imageURL: { type: GraphQLString },
//     dishes:{ type: DishType},
//     phoneNo: { type: GraphQLInt },
//     addressLine: { type: GraphQLString },
//     city: { type: GraphQLString },
//     state: { type: GraphQLString },
//     country: { type: GraphQLString },
//     description: { type: GraphQLString },
//     openHrs: { type: GraphQLString },
//     delievryMode:{ type: GraphQLString }


//     })
// })

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // order: {
    //   type: OrderType,
    //   //argument passed by the user while making the query
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     //Here we define how to get data from database source

    //     //this will return the book with id passed in argument
    //     //by the user
    //     return Book.findById(args.id);
    //   },
    // },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({});
      },
    },
    customers:{
        type: new GraphQLList(UserType),
        resolve(parent, args){
            return Users.find({});
        }
    }
    // author: {
    //   type: AuthorType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Author.findById(args.id);
    //   },
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     return Author.find({});
    //   },
    // },
  },
});
// const Mutation = new GraphQLObjectType({
// });

module.exports = new GraphQLSchema({
    query: RootQuery,
 //  mutation:Mutation
});