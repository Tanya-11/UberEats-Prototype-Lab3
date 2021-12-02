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
  GraphQLInputObjectType,
} = graphql;

const FavType = new GraphQLObjectType({
  name: "fav",
  fields: () => ({
    restaurant: { type: GraphQLString },
  }),
});
const custType = new GraphQLObjectType({
  name: "cust",
  fields: () => ({
    user_id: { type: GraphQLID },
    username: { type: GraphQLString },
  }),
});
const DishType = new GraphQLObjectType({
  name: "Dish",
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
    fav: { type: new GraphQLList(FavType) },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    nickName: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    dishes: { type: new GraphQLList(DishType) },
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
    customer: { type: custType },
    restId: { type: GraphQLString },
    dishes: { type: new GraphQLList(DishType) },
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
    // orders: {
    //   type: new GraphQLList(OrderType),
    //   resolve(parent, args) {
    //     return Order.find({});
    //   },
    // },
    customers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return Users.find({});
      },
    },
    search: {
      type: new GraphQLList(UserType),
      args: {
        searchTabText: { type: GraphQLString },
        category: { type: GraphQLString },
        city: { type: GraphQLString },
        delivery: { type: GraphQLBoolean },
        pickUp: { type: GraphQLBoolean },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return search(args);
      },
    },
    favs: {
      type: UserType,
      args: {
        user: { type: GraphQLString },
        isFav: { type: GraphQLBoolean },
        restaurant: { type: GraphQLID },
      },
      resolve(parent, args) {
        return favs(args);
      },
    },
    addFavs: {
      type: UserType,
      args: {
        user: { type: GraphQLString },
        restaurant: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addFav(args);
      },
    },

    orders: {
      type: OrderType,
      args: {
        user: { type: GraphQLString },
      },
      resolve(parent, args) {
        return orders(args);
      },
    },

    customerProfile: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve(parent, args) {
        return loadCustomerProfile(args);
      },
    },
    dishes: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve(parent, args) {
        return loadDishes(args);
      },
    },
    activeOrders: {
      type: new GraphQLList(OrderType),
      args: {
        user: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getActiveOrders(args);
      },
    },
    customerCancelledOrders: {
      type: new GraphQLList(OrderType),
      args: {
        user: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getCustomerCancelledOrders(args);
      },
    },
    restCompleteOrders: {
      type: new GraphQLList(OrderType),
      args: {
        user: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getRestCompleteOrders(args);
      },
    },
    // placeCart: { // Need to make Inputs???
    //   type: OrderType,
    //   args: {
    //     orders: { type: new GraphQLList() },
    //     orderStatus: { type: GraphQLString },
    //     user: { custType },
    //     restId: { type: GraphQLString },
    //     date: { type: GraphQLString },
    //     price: { type: GraphQLFloat },
    //   },
    //   resolve(parent, args) {
    //     return placeCart(args);
    //   },
    // },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveProfile: {
      //change to mutation
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        nickName: { type: GraphQLString },
        phoneNo: { type: GraphQLInt },
        country: { type: GraphQLString },
      },
      resolve(parent, args) {
        return saveProfile(args);
      },
    },
    newDish: {
      type: UserType,
      args: {
        restRef: { type: GraphQLString },
        dishName: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addNewDish(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

function search(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    Users.find({
      $and: [
        {
          $or: [
            { name: { $regex: `${args.searchTabText}`, $options: "i" } },
            {
              "dishes.dishName": {
                $regex: `${args.searchTabText}`,
                $options: "i",
              },
            },
          ],
        },

        {
          dishes: {
            $elemMatch: {
              category: { $regex: args.category, $options: "i" },
              //'Vegetarian'
            },
          },
        },
        {
          city: { $regex: args.city, $options: "i" },
          //    {"$in":[/San/]}
        },
        {
          $or: [
            { delivery: { $eq: args.delivery } },
            { pickedUp: { $eq: args.pickUp } },
          ],
        },
        //  { role: "restaurant" },
      ],
    }).then(
      (result) => {
        console.log(result);
        resolve(result);
      },
      (err) => {
        resolve(err);
      }
    );
  });
}

function favs(args) {
  return new Promise((resolve, reject) => {
    Users.findOne({ username: args.user }, function (err, result) {
      if (err) {
        resolve([]);
      }
      if (result) {
        if (args?.restaurant) {
          if (args.isFav === true) {
            result.fav.push({ restaurant: args.restaurant });
          } else {
            result.fav = result.fav.filter(
              (item) => item.restaurant !== args.restaurant
            );
          }
          result.save(function (error, res) {
            if (error) {
              resolve(res);
            } else {
              resolve(res);
            }
          });
        }
      }
    });
  });
}

function saveProfile(args) {
  Users.findOne({ username: args.userId }).then(
    (user) => {
      user.name = args.name;
      user.username = args.username;
      user.city = args.city;
      user.state = args.state;
      (user.nickName = args.nickName), (user.phoneNo = args.phoneNo);
      user.country = args.country;
      // user.addressLine1 = args.addressLine1
      // user.addressLine2 = args.addressLine2
      user.save((resp, err) => {
        if (err) {
          res.statusCode = 500;
          console.log(err);
          res.send(err);
        } else {
          res.statusCode = 200;
          //   console.log(resp);
          res.send({ success: true });
          // res.send({ success: true, token })
        }
      });
    },
    (error) => {
      console.log(error);
    }
  );
}

function orders(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    Order.findOne(
      { "orders.customer.username": args.user },
      function (err, result) {
        if (err) {
          resolve([]);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addFav(args) {
  return new Promise((resolve, reject) => {
    Users.findOne({ username: args.user }, function (err, result) {
      if (err) {
        resolve([]);
      }
      if (result) {
        if (args?.restaurant) {
          result.fav.push({ restaurant: args.restaurant });

          result.save(function (error, res) {
            if (error) {
              resolve(res);
            } else {
              resolve(res);
            }
          });
        }
      }
    });
  });
}

function placeCart(args) {
  return new Promise((resolve, reject) => {
    let dish = [];
    args.orders.forEach((item) => {
      dish.push(
        new Dishes({
          dishName: item.dishName,
          dishPrice: item.dishPrice,
          quantity: item.quantity,
          price: item.price,
        })
      );
    });

    let order = new Order({
      _id: new mongoose.Types.ObjectId(),
      orderStatus: args.orderStatus,
      customer: {
        ...args.user,
      },
      restId: args.restId,
      dishes: dish,
      date: args.date,
      price: args.price,
    });
    order.save(function (error, res) {
      if (error) {
        resolve(res);
      } else {
        resolve(res);
      }
    });
  });
}
function loadCustomerProfile(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    Users.findOne({ username: args.username })
      .select("-refreshToken")
      .then(
        (result) => {
          if (result) {
            console.log(result);
            resolve(result);
          } else resolve("No User found");
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

function loadDishes(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    Users.find({ username: args.username }).then(
      (result) => {
        resolve(...result);
      },
      (err) => {
        resolve(err);
      }
    );
  });
}

function addNewDish(args) {
  return new Promise((resolve, reject) => {
    Users.findOne({ username: args.restRef }).then((user) => {
      console.log(user);
      const dish = new Dishes({
        dishName: args.dishName,
        ingredients: args.ingredients,
        price: args.price,
        description: args.description,
        category: args.category,
      });
      user.dishes.push(dish);
      user.save(function (error, res) {
        if (error) {
          resolve(res);
        } else {
          resolve(res);
        }
      });
    });
  });
}

function getActiveOrders(args) {
  return new Promise((resolve, reject) => {
    Order.find({
      $and: [
        { restId: args.user },
        {
          $or: [
            { orderStatus: { $eq: "Received" } },
            { orderStatus: { $eq: "Preparing" } },
            { orderStatus: { $eq: "Placed" } },
          ],
        },
      ],
    }).then(
      (resp) => {
        resolve(resp);
      },
      (err) => {
        resolve(err);
      }
    );
  });
}

function getRestCompleteOrders(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    Order.find({
      $and: [
        { restId: args.user },
        {
          $or: [
            { orderStatus: { $in: [/Delivered/] } },
            { orderStatus: { $in: [/Picked/] } },
          ],
        },
      ],
    }).then(
      (resp) => {
        resolve(resp);
      },
      (err) => {
        resolve(err);
      }
    );
  });
}

function getCustomerCancelledOrders(args) {
  return new Promise((resolve, reject) => {
    Order.find({
      $and: [
        { "customer.username": args.user },
        {
          $or: [
            { orderStatus: { $eq: "Cancelled" } },
            { orderStatus: { $eq: "Cancel" } },
          ],
        },
      ],
    }).then((resp) => {
      console.log(resp);
      if (resp !== null) {
        resolve(resp);
      } else {
        resolve(resp);
      }
    });
  });
}
