var express=require("express");
var router=express.Router({mergeParams:true});
var hotel=require("../models/hotel");
var comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/new", middleware.isLoggedIn,function(req,res){
    hotel.findById(req.params.id,function(err,resturant){
        if(err)
        console.log(err);
        else
        res.render("newcom",{resturant:resturant});
    });
    
});
router.post("/",middleware.isLoggedIn,function(req,res){
//     var d = new Date();
//     var date = d.getDate();
// var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
// var year = d.getFullYear();
// console.log(dateStr);
// var dateStr = date + "/" + month + "/" + year;
// console.log(dateStr);
    hotel.findById(req.params.id,function(err,resturant){
        if(err)
        {
        console.log(err);
     res.redirect("/hotels");}
        else
        {
            
            comment.create(req.body.comment,function(err,comment){
                if(err)
                console.log(err);
                else
                {
                    comment.author.id=req.user._id;
            comment.author.username=req.user.username;
            comment.save();
                    resturant.comments.push(comment);
                  resturant.save();
                  req.flash("success","Successfully Added Comment");
                res.redirect("/hotels/"+req.params.id);}
            })
        }

    })
});
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
             res.redirect("back");
        }
        else
      { res.render("editcomments",{resturant_id:req.params.id,comment:foundComment });}
    });
    
});
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err)
       {  res.redirect("back");}
        else
        {res.redirect("/hotels/"+req.params.id);}
    })
});
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err)
        res.redirect("/hotels/"+req.params.id);
        else
       {req.flash("success","Comment Deleted"); res.redirect("/hotels/"+req.params.id);}
    });
});


module.exports=router;