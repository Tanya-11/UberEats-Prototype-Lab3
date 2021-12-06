const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const { Users } = require("../models/users");
const { Dishes, Order } = require("../models/orders");
const orders = require("../models/orders");
const { uploadFile, getFileStream } = require("../s3");
const multer = require("multer");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
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
// router.post("/search", (req, res) => {
//   Users.find({
//     $and: [
//       {
//         $or: [
//           { name: { $regex: `${req.body.searchTabText}`, $options: "i" } },
//           {
//             "dishes.dishName": {
//               $regex: `${req.body.searchTabText}`,
//               $options: "i",
//             },
//           },
//         ],
//       },

//       {
//         dishes: {
//           $elemMatch: {
//             category: { $regex: req.body.category, $options: "i" },
//             //'Vegetarian'
//           },
//         },
//       },
//       {
//         city: { $regex: req.body.city, $options: "i" },
//         //    {"$in":[/San/]}
//       },
//       {
//         $or: [
//           { delivery: { $eq: req.body.delivery } },
//           { pickedUp: { $eq: req.body.pickUp } },
//         ],
//       },
//       { role: "restaurant" },
//     ],
//   })
//     .then(
//       (result) => {
//         callback(null, { statusCode: 200, data: result });
//       },
//       (err) => {
//         console.log(err);
//         callback(null, { statusCode: 400, err: err });
//       }
//     )
//     .catch((err) => {
//       console.log(err);
//       callback(null, { statusCode: 500, err: err });
//     });
// });

router.post("/fav-add", (req, res) => {
  console.log(req.body.restaurant);
  Users.findOne({ username: req.body.user })
    .then(
      (result) => {
        // console.log(result);
        result?.fav.push({ restaurant: req.body.restaurant });

        res.send(result.fav);
        result.save((resp, error) => {
          if (error) {
            res.statusCode = 500;
            console.log(error);
            res.send(error);
          } else {
            //   console.log(resp);
            res.statusCode = 400;
            res.send({ success: false });
            // res.send({ success: true, token })
          }
        });
      },
      (err) => {
        console.log(err);
      }
    )
    .catch((err) => {
      res.statusCode = 500;
      res.send({ success: false });
    });
});

router.post("/favs", (req, res) => {
  // console.log('##############################################');
  // console.log(req.body);
  Users.findOne({ username: req.body.user })
    .then(
      (result) => {
        // console.log(result.fav);
        if (req.body?.restaurant) {
          if (req.body.isFav === true) {
            // console.log('true');
            result.fav.push({ restaurant: req.body.restaurant });
          } else {
            // console.log('not true');
            result.fav = result.fav.filter(
              (item) => item.restaurant !== req.body.restaurant
            );

            // let index  = result.fav.indexOf(req.body.restaurant)
            //  console.log(found);
            // result.fav.splice(index,1);
          }
          result.save((resp, error) => {
            if (error) {
              //  res.statusCode = 500
              //  console.log(error);
              // res.send(error)
            } else {
              //   console.log(resp);
              //   res.statusCode=400;
              //   res.send({success:false});
              // res.send({ success: true, token })
            }
          });
        }
        console.log(result.fav);

        res.send(result.fav);
      },
      (err) => {
        console.log(err);
      }
    )
    .catch((error) => {
      res.statusCode = 500;
      res.send({ success: false });
    });
});

router.get("/me", (req, res, next) => {
  // console.log('verify');
  // res.send(req.user)
});
// router.post("/customer/profile", async (req, res) => {
//   Users.findOne({ username: req.body.username })
//     .select("-refreshToken")
//     .then(
//       (result) => {
//         // console.log(result);
//         res.statusCode = 200;
//         res.send(result);
//       },
//       (error) => {
//         res.statusCode = 500;
//         res.send(error);
//       }
//     );
// });

// router.post("/customer/profile/save", (req, res) => {
//   //   console.log(req.body);
//   Users.findOne({ username: req.body.userId }).then(
//     (user) => {
//       user.name = req.body.name;
//       user.username = req.body.username;
//       user.city = req.body.city;
//       user.state = req.body.state;
//       (user.nickName = req.body.nickName), (user.phoneNo = req.body.phoneNo);
//       user.country = req.body.country;
//       // user.addressLine1 = req.body.addressLine1
//       // user.addressLine2 = req.body.addressLine2
//       user.save((resp, err) => {
//         if (err) {
//           res.statusCode = 500;
//           console.log(err);
//           res.send(err);
//         } else {
//           res.statusCode = 200;
//           //   console.log(resp);
//           res.send({ success: true });
//           // res.send({ success: true, token })
//         }
//       });
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// });

// router.post("/cart/placed", (req, res) => {
//   //    console.log(req.body);
//   let dish = [];
//   req.body.orders.forEach((item) => {
//     dish.push(
//       new Dishes({
//         _id: new mongoose.Types.ObjectId(),
//         dishName: item.dishName,
//         dishPrice: item.dishPrice,
//         quantity: item.quantity,
//         price: item.price,
//       })
//     );
//   });
//   let order = new Order();
//   //order._id=new mongoose.Types.ObjectId();

//   order = new Order({
//     _id: new mongoose.Types.ObjectId(),
//     orderStatus: req.body.orderStatus,
//     customer: {
//       ...req.body.user,
//     },
//     restId: req.body.restId,
//     dishes: dish,
//     date: req.body.date,
//     // deliveryMode:
//     //  address:
//     //  quantity: req.body.quantity,
//     price: req.body.price,
//   });
//   order.save().then(
//     // (resp,error)=>{
//     (resp) => {
//       //    console.log(resp);
//       res.statusCode = 200;
//       res.send({ success: true });
//     },
//     (error) => {
//       console.log(error);
//       res.status(500).send(error);
//     }
//   );
// });
// router.post("/orders", (req, res) => {
//   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//   Order.find({ "orders.customer.username": req.body.user }).then(
//     (resp) => {
//       console.log(resp);
//       res.statusCode = 200;
//       res.send(resp);
//     },
//     (err) => {
//       console.log(err);
//       res.statusCode = 500;
//     }
//   );
// });

router.post("/upload/photo", upload.single("image"), async (req, res) => {
  console.log("print" + req.body.username);
  console.log("img" + req.file);

  Users.findOne({ username: req.body.username })
    .then(
      async (result) => {
        console.log(result);
        const image = await uploadFile(req.file);
        await unlinkFile(req.file.path);
        console.log(image);
        console.log(req.body.description);
        //res.send({imagePath: `/images/${image.Key}`})
        result.imageURL = image.Key;
        result.save().then(
          (resp) => {
            res.send(resp);
            console.log(resp);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
        res.status(500).json("File Upload failed");
      }
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json("File Upload failed");
    });
});

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

module.exports = router;
