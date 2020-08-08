var express=require("express");
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
var name=req.body.name;var image=req.body.image;var desc = req.body.description;
var author={
    id:req.user._id,
    username:req.user.username
}
var newResturant={name:name,image:image,description:desc,author:author};
//create a new campground and save to database
hotel.create(newResturant,function(err,newresturant){
    if(err)
    console.log('something went wrong');
    else
    {
        res.redirect("/hotels");
        // console.log(newresturant);
    }
});





});
router.get("/new",middleware.isLoggedIn,function(req,res){
    
    res.render("new.ejs");
});
router.get("/:id",function(req,res){
    var d = new Date();
        var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    // console.log(dateStr);
    var dateStr = date + "/" + month + "/" + year;
    console.log(dateStr);
    hotel.findById(req.params.id).populate("comments").exec(function(err,foundResturant){
        if(err)
        console.log(err);
        else
        // console.log(foundResturant);
        res.render("show",{resturant:foundResturant,date:dateStr});
    });
    });

    //update resturant routes
    router.get("/:id/edit", middleware.checkResturantOwnership,function(req,res){
        //is logged in??
        
            hotel.findById(req.params.id,function(err,foundResturant){
                res.render("editresturants",{resturant:foundResturant});
        }); 

        

    });
    router.put("/:id",middleware.checkResturantOwnership,function(req,res){
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
    router.delete("/:id",middleware.checkResturantOwnership,function(req,res){
     hotel.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/hotels");
         }
         else
         res.redirect("/hotels");
     })
    });

  

 
    
    module.exports=router;