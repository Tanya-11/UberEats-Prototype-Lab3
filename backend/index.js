const express = require("express");
// const session = require("express-session");
// const db = require('./utils/database');
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./utils/database");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./auth");
require("dotenv").config();
const authRouter = require("./routes/login");
const restaurantRouter = require("./routes/restProfile");
const customerRouter = require("./routes/customerRoutes");
// const Customer = require('./models/customer');
// const Restaurant = require('./models/restaurant');
const { Order } = require("./models/orders");
const { Users } = require("./models/users");
const schema = require("./graphql/schema");

const PORT = process.env.PORT || 3001;
const router = express.Router();
//-----------------------------------------------Graphql--------------------------------------------------------------------------
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
//---------------------------------------------END OF IMPORTS---------------------------------------------------------------

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
  // limits: { fileSize: 1000000 }
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use('/images', express.static('images'));
app.use(
  cors({
    origin: process.env.WHITELISTED_DOMAINS,
    // methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// app.use(
//   '/graphql',
//   graphqlHttp({
//     schema: buildSchema(`
//         type Event {
//           _id: ID!
//           title: String!
//           description: String!
//           price: Float!
//           date: String!
//         }

//         type RootQuery {
//             events: [Event!]!
//         }

//         schema {
//             query: RootQuery
//         }
//     `),
//     rootValue: {
//       events: () => {
//         return events;
//       }
//     },
//     graphiql: true
//   })
// );
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: "some-secret",
//   resave: false,
//   saveUninitialized: false,
//   duration: 60 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
// }));

// mongoose.connect(
//   'mongodb+srv://admin:admin@cluster0.lceyg.mongodb.net/UberEats?retryWrites=true&w=majority',{useNewUrlParser:true})
// // passport.use(Customer.createStrategy());
// passport.serializeUser(function(user, done) {
//   console.log('us'+user);
//   done(null, user.id);
// });

app.use(passport.initialize());
app.use("/api", authRouter);
app.use("/api", restaurantRouter);
app.use("/api", customerRouter);

//---------------------------------------------END OF MIDDLEWARE------------------------------------------------------------

//   mongoose.set("useCreateIndex",true);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
