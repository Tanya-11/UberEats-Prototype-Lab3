const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const {Users} = require("../models/users")

//Called during login/sign up.
passport.use(new LocalStrategy(Users.authenticate()))

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(Users.serializeUser())