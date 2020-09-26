var express=require("express");
const moment=require('moment');
var router=express.Router();
var hotel=require("../models/hotel");
var middleware=require("../middleware");
router.get("/",function(req,res){
    // console.log(req.user);
    
    hotel.find({}, function(err,resturants){
        if(err)
        {console.log(err);}
        else
        {res.render("index",{resturants:resturants,currentUser:req.user});}
    });
   
    
});
router.post("/",middleware.isLoggedIn,function(req,res){
var name=req.body.name;var image1=req.body.image1;var image2=req.body.image2;var image3=req.body.image3;var desc = req.body.description;var price=req.body.price;
var location=req.body.location;var website=req.body.website;var contact=req.body.contact;var booking=req.body.booking;
var author={
    id:req.user._id,
    username:req.user.username
}
var newHotel={name:name,image1:image1,image2:image2,image3:image3,description:desc,price:price,author:author,location:location,website:website,contact:contact,booking:booking};
//create a new hotel and save to database
hotel.create(newHotel,function(err,newhotel){
    if(err)
    console.log('something went wrong');
    else
    {
        
        // console.log(newHotel);
        res.redirect("/hotels");
        // console.log(newresturant);
    }
});





});
router.get("/new",middleware.isLoggedIn,function(req,res){
    
    res.render("new.ejs");
});
router.get("/:id",function(req,res){
    
    hotel.findById(req.params.id).populate("comments").exec(function(err,foundHotel){
        if(err)
        console.log(err);
        else
       { 
           
        res.render("show",{resturant:foundHotel,moment:moment});}
    });
    });

    //update resturant routes
    router.get("/:id/edit", function(req,res){
        //is logged in??
        
            hotel.findById(req.params.id,function(err,foundResturant){
                res.render("editresturants",{resturant:foundResturant});
        }); 

        

    });
    router.put("/:id",function(req,res){
        hotel.findByIdAndUpdate(req.params.id,req.body.resturant,function(err,updatedResturant){
            if(err)
            res.redirect("/hotels");
            else
            {
                res.redirect("/hotels/"+req.params.id);
            }
        })
    })
    //delete resturant routes
    router.delete("/:id",function(req,res){
     hotel.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/hotels");
         }
         else
         res.redirect("/hotels");
     })
    });

  

 
    
    module.exports=router;