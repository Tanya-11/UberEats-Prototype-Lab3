const express = require("express")
const mongoose = require('mongoose');

const router = express.Router()
const {Users} = require('../models/users')
const {Dishes,Order} =  require('../models/orders')
const orders = require("../models/orders")
router.post('/search',(req,res)=>{
    console.log(req.body.searchData);
    let {city, mode, category, searchTabText} = req.body.searchData
  //  console.log(req.body);
    Users.find(
//         {role:'restaurant',
//         city:city,
//         deliveryMode:mode,
// }
    {$and: [
        {$or: [
            {'name':{'$in':[/Para/]}}, 
        
            ]},
        {'dishes.dishName':{'$in':[/Bir/]}}, 
        {'dishes':{"$elemMatch":{'category':'Vegetarian'}}}, 
        {'city':{"$in":[/San/]}}, 
        {'delivery':{$eq: true}}, 
        {'pickedUp': {$eq: false}}, 
        {'role':'restaurant'},
     
    // {'deliveryMode.topics.modules.classes.name':{"$in":[/math/]}}
        ] 
    }




).then(
        result=>{
            console.log('######################');
            console.log(result);
           
            let restNameFilterResp=[];
            let dishFilterResp=[];
            let categoryFilterResp= [];
                 result.filter(el=>{
                if(el.name == (searchTabText)){
                   //  console.log(el);
                   restNameFilterResp.push(el)
                }
                       
                })
                result.filter(el=>{
                    el.dishes.filter(item=>{
                        if(item.dishName == (searchTabText)){
                          //  console.log(item);
                          dishFilterResp.push(el);
                           // return el
                        }
                          
                    })
                })
                  result.filter(el=>{
                    el.dishes.filter(item=>{
                        if(item.category===(category)){
                          //  console.log(item);
                          categoryFilterResp.push(el)
                           // return el
                        }
                          
                    })
                })
            //     console.log('1'+restNameFilterResp.length);
            //     console.log('@@@@@@@@@@@@@@@@@@@@');
            //     console.log('2'+dishFilterResp.length);
            //     console.log('@@@@@@@@@@@@@@@@@@@@');

            //   console.log('rw'+categoryFilterResp.length);
            
            // console.log(restNameFilterResp);
            // console.log('set');
            if(category=='' && searchTabText==''){
                // console.log('less filters');

                // console.log(new Set([...result,...restNameFilterResp,...dishFilterResp,...categoryFilterResp]));
                res.status(200).json(
                   [...new Set([...result,...restNameFilterResp,...dishFilterResp,...categoryFilterResp])
                 ] )
            }
            else {
                // console.log(new Set([...restNameFilterResp,...dishFilterResp,...categoryFilterResp]));
                res.send(
                    [...new Set([...restNameFilterResp,...dishFilterResp,...categoryFilterResp])]
                    )

            }
        
            // res.send(new Set([restNameFilterResp,dishFilterResp,categoryFilterResp]))
         //   res.send({success:true});
        },
        err=>{
            console.log(err);
            res.statusCode=400;
            res.send({success:false});
        }
    )
    .catch(err=>{
        console.log(err);
        res.statusCode=500;
        res.send({success:false});
    })
})

router.post('/fav-add',(req,res)=>{
    console.log(req.body.restaurant);
    Users.findOne({username:req.body.user}).then(
       result=>{
            // console.log(result);
            result?.fav.push({restaurant:req.body.restaurant});

            res.send(result.fav);
            result.save((resp,error)=>{
                if (error) {
                 res.statusCode = 500
                 console.log(error);
                res.send(error)
                  } else {    
                    //   console.log(resp);   
                      res.statusCode=400;
                      res.send({success:false});        
                   // res.send({ success: true, token })
                  }
            })
       },
       err=>{
        console.log(err);
       }
    )
    .catch(err=>{
        res.statusCode=500;
        res.send({success:false});
    })
})

router.post('/favs',(req,res)=>{
    // console.log('##############################################');
    // console.log(req.body);
    Users.findOne({username:req.body.user}).then(
       result=>{
            // console.log(result.fav);
            if(req.body?.restaurant){
                if(req.body.isFav===true){
                    // console.log('true');
                    result.fav.push({restaurant:req.body.restaurant});
                }
                else{
                    // console.log('not true');
                    result.fav =  result.fav.filter(item => item.restaurant !== req.body.restaurant);

                    // let index  = result.fav.indexOf(req.body.restaurant)
                  //  console.log(found);
                    // result.fav.splice(index,1);
                 
                }
                result.save((resp,error)=>{
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
                })
            }
             console.log(result.fav);

           res.send(result.fav);
        
       },
       err=>{
        console.log(err);
       }
    )
    .catch(error=>{
        res.statusCode=500;
        res.send({success:false});
    })
})

router.get("/me", (req, res, next) => {
    // console.log('verify');
   // res.send(req.user)
  })
  router.post('/customer/profile',async (req,res)=>{
      Users.findOne({username:req.body.username}).
        select('-refreshToken')
        .then(
           result=>{
            // console.log(result);
            res.statusCode =200
            res.send(result)
           },
           error=>{
            res.statusCode =500
            res.send(error)
           }
       )
  })

  
  router.post('/customer/profile/save',(req,res)=>{
    //   console.log(req.body);
    Users.findOne({username:req.body.userId}
      ).then(
         user=>{
            user.name=req.body.name;
            user.username = req.body.username;
            user.city = req.body.city
            user.state = req.body.state
            user.nickName = req.body.nickName,
            user.phoneNo = req.body.phoneNo
            user.country = req.body.country
            // user.addressLine1 = req.body.addressLine1
            // user.addressLine2 = req.body.addressLine2
            user.save((resp,err)=>{
                if (err) {
                 res.statusCode = 500
                 console.log(err);
                res.send(err)
                  } else {    
                    res.statusCode=200;
                    //   console.log(resp);   
                      res.send({success:true});        
                   // res.send({ success: true, token })
                  }
            })
         },
         error=>{
             console.log(error);
         }
     )
})

router.post('/cart/placed',(req,res)=>{
//    console.log(req.body);
   let dish = [];
    req.body.orders.forEach(item=>{
       dish.push(new Dishes({
        _id:new mongoose.Types.ObjectId(),
            dishName:item.dishName,
            dishPrice: item.dishPrice,
            quantity: item.quantity,
            price : item.price
        }))
    })
   let order = new Order();
   //order._id=new mongoose.Types.ObjectId();

   order = (new Order({
    _id:new mongoose.Types.ObjectId(),
    orderStatus: req.body.orderStatus,
    customer: {
        ...req.body.user,
    },
      restId:req.body.restId,
      dishes:dish,
      date: req.body.date,
     // deliveryMode:
    //  address: 
    //  quantity: req.body.quantity,
      price:req.body.price,

   }));
   order.save().then(
      // (resp,error)=>{
    resp=>{
        //    console.log(resp);
           res.statusCode =200;
           res.send({'success':true})
       },
       error=>{
           console.log(error);
           res.status(500).send(error)
       }
   )
})
 router.post('/orders',(req,res)=>{
     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    Order.find(
        {'orders.customer.username':req.body.user}, 
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






















module.exports = router;
