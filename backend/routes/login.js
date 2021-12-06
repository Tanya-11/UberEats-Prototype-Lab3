const express = require("express");
const router = express.Router();
// const Customer = require("../models/customer")
// const Restaurant = require('../models/restaurant')
const { Users } = require("../models/users");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../auth");

router.post("/signup", (req, res, next) => {
  // Verify that username name is not empty
  if (!req.body.username) {
    res.statusCode = 500;
    res.send({
      name: "UserName Error",
      message: "The username name is required",
    });
  } else {
    Users.register(
      new Users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          //   console.log('error'+err);
          res.statusCode = 500;
          res.send(err);
        } else {
          //  console.log('user'+user);
          user.username = req.body.username;
          user.role = req.body.persona;
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          //    console.log('user'+refreshToken);
          //    console.log("refresh"+user);
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token, user: user._id });
            }
          });
        }
      }
    );
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  //  console.log('##################id'+ req.user);
  // console.log('req'+JSON.stringify(req.body));

  const refreshToken = getRefreshToken({ _id: req.user._id });
  //, role:req.user.persona
  Users.findOne({ _id: req.user._id, role: req.body.persona })
    .then(
      (user) => {
        console.log(user);
        let address = {
          addressLine1: user?.addressLine1,
          addressLine2: user?.addressLine2,
          city: user.city,
        };
        user.refreshToken.push({ refreshToken: refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
            console.log("err1" + err);
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({
              success: true,
              token,
              address: address,
              user: user._id,
            });
            //  console.log('res1'+res.token);
          }
        });
      },
      (err) => {
        console.log("err1" + err);
        // next(err)
        //  res.send({ success: false })
      }
    )
    .catch((err) => {
      res.statusCode = 401;
      res.send("Unauthorized" + err);
    });
});

router.post("/refreshToken", (req, res, next) => {
  //  console.log(JSON.parse(req)+"req refreshhhhhhhhhhhhhhhhhhhhh");
  const { signedCookies = {} } = req;
  // console.log(signedCookies);
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      //   console.log('##################id'+JSON.stringify(payload));
      const userId = payload._id;
      //  console.log('##################id'+userId);
      Users.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            //  console.log(user);

            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            //  console.log(tokenIndex);
            if (tokenIndex === -1) {
              res.statusCode = 500;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              // console.log(newRefreshToken);
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 401;
                  res.send(err);
                  //  console.log(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                  // console.log(req.user);
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
            console.log("err");
          }
        },
        (err) => {
          next(err);
          // console.log(err);
        }
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized" + err);
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.post("/logout", verifyUser, (req, res, next) => {
  console.log(req);
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  Users.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => console.log(err)
  );
});

router.get("/me", verifyUser, (req, res, next) => {
  // console.log('verify'+req.user);
  res.send(req.user);
});

module.exports = router;
