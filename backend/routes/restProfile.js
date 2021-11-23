const express = require("express")
const router = express.Router()
const {Dishes,Order} =  require('../models/orders')
const orders = require("../models/orders")
// const mongoose = require('mongoose');

// const Customer = require("../models/customer")
// const Restaurant = require('../models/restaurant')
// const passport = require("passport")
// const jwt = require("jsonwebtoken");
let {Users, Dish} = require('../models/users');

router.get('/profile/:username',(req,res)=>{
    console.log("calling"+JSON.stringify(req.params.username));
    Users.findOne({"username":req.params.username}).then(
        result=>{
     //       console.log(result);
           res.send(result)
        },
        err=>{
            console.error(err);
        }
    )

})

router.post('/profile',(req,res)=>{
    console.log(req.body.restData);
    Users.updateOne({"username":req.body.restData.username},
    {
        ...req.body.restData
    }
    ).then(
        result=>{
        //    console.log("found"+JSON.stringify(result));
          res.send(result)
        },
        err=>{
            console.error(err);
        }
    )

})

router.post('/dishes',(req,res)=>{
    console.log(req.body.restData);
    Users.find({"username":req.body.username}
    ).then(
        result=>{
         //   console.log("found"+JSON.stringify(result));
          res.send(result)
        },
        err=>{
            console.error(err);
        }
    )

})
router.post('/newdish',(req,res)=>{
    Users.findOne({"username": req.body.restRef})
  .then((user) => {
      console.log(user);
    const address = user.dishes.id(req.body._id); // returns a matching subdocument
    console.log(address);
    if(address===null){
        const dish = new Dish({
                            dishName: req.body.dishName,
                            ingredients:req.body.ingredients,
                            price:req.body.price,
                            description:req.body.description,
                            category:req.body.category
                        })
                       user.dishes.push(dish);
                    //    user.save((err,response)=>{
                    //         if(err) console.log(err);
                    //         else  console.log('in else'+response);
                    //     })
   // updates the address while keeping its schema       
    // address.zipCode = req.body.zipCode; // individual fields can be set directly
                    }else{
    address.set(req.body); 

}
    return user.save(); // saves document with subdocuments and triggers validation
  })
  .then((user) => {
      console.log(user);
    res.send({ user });
  })
  .catch(e => res.status(400).send(e));


    // Users.findOneAndUpdate(
    //     { "username": req.body.restRef, "dishes._id": req.body._id },
    //     { 
    //         "$set": {
    //             "dishes.$.price": req.body.price,
    //             "dishes.$.dishName":req.body.dishName,
    //             "dishes.$.ingredients":req.body.ingredients,
    //             "dishes.$.price":req.body.price,
    //             "dishes.$.category":req.body.category
    //         }
    //     },
    //     function(err,doc) {
    //         if(err){
    //             console.log(err);
    //             console.log('do'+doc);
    //             res.statusCode=400;
    //             res.send({
    //                 "success":false
    //             }

    //             )}
    //         else {
    //             console.log(doc);
    //             console.log(err);
    //             // res.statusCode=200;
    //             // res.send({
    //             //     "success":true
    //             // }
    //             // )
    //         }
    //     }
    // );
  //  So this 
    // console.log('w'+JSON.stringify(req.body.restRef));
    // Users.findOne({"username":req.body.restRef}
    // ).then(
    //     (result)=>{
    //         console.log('res'+result.dishes);
    //         if(result.dishes && result.dishes.length>0){
    //            let exitDish =  result.dishes.filter(el=>{
    //                  if(el._id == (req.body._id)){
    //                     return el
    //                  }
    //                  else null;
    //             })
    //             if(exitDish){
    //                 const dish = new Dish({
    //                     dishName: req.body.dishName,
    //                     ingredients:req.body.ingredients,
    //                     price:req.body.price,
    //                     description:req.body.description,
    //                     category:req.body.category
    //                 })

    //             }


                
    //           console.log('in if'+exitDish);
    //         }
    //         else{
    //         const dish = new Dish({
    //                 dishName: req.body.dishName,
    //                 ingredients:req.body.ingredients,
    //                 price:req.body.price,
    //                 description:req.body.description,
    //                 category:req.body.category
    //             })
    //            result.dishes.push(dish);
    //             result.save((err,response)=>{
    //                 if(err) console.log(err);
    //                 else  console.log('in else'+response);
    //             })
                
    //         }
    //      //   console.log("found"+(result));
    //   //    res.send(result)
    //     },
    //     err=>{
    //         console.error(err);
    //     }
    // )
    // .catch(err=>{
    //     console.log(err);
    // })

})


router.post('/orders/active',(req,res)=>{
     console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
   Order.find(
       {'restId':req.body.user, 
        'orderStatus': req.body.orderStatus}, 
       ).then(
       resp=>{
           console.log(resp);
          res.statusCode =200;
          res.send(resp)
       },
       err=>{
           console.log(err);
           res.statusCode =500;
       }
   )

})

router.post('/orders/update/status',(req,res)=>{
    console.log(req.body);
   Order.findByIdAndUpdate(
       {'_id':req.body.orderId},
       {
           '$set':{
               'orderStatus':req.body.orderStatus,
               'date': req.body.date
           }
       }
       // 'orders.orderStatus': req.body.orderStatus
    
       ).then(
       resp=>{
        //    resp.orders.orderStatus = req.body.orderStatus;
        //    resp.save((err,response)=>{
        //                     if(err) console.log(err);
        //                     else 
        //                     {
        //                         res.status(200).send(response);
        //                         console.log('in else'+response); 
        //                     } 
        //                 })
        console.log("^^^^^^^^^^^^^");

         console.log(resp);
         res.status(200).send(response);
              
       },
       err=>{
           console.log(err);
           res.statusCode =500;
       }
   )

})

router.post('/orders/complete',(req,res)=>{
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  Order.find(
        { $and: [
            {'restId':req.body.user}, 
      {$or: [
        {'orderStatus':{'$in':[/Delivered/]}},
        {'orderStatus':{'$in':[/Picked/]}}, 
    
        ]},
        ]}
     
      ).then(
      resp=>{
          console.log(resp);
         res.statusCode =200;
         res.send(resp)
      },
      err=>{
          console.log(err);
          res.statusCode =500;
      }
  )

})

module.exports = router