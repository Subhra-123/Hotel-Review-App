var hotel=require("../models/hotel");
var comment=require("../models/comment");
var middlewareObj={};
middlewareObj.checkResturantOwnership=function (req,res,next){
    if(req.isAuthenticated())
    {
        hotel.findById(req.params.id,function(err,foundResturant){
            if(err)
            res.redirect("back");
            else
            {
                if(foundResturant.author.id.equals(req.user._id))
                next();
        else
      {req.flash("error","You don't have permission to do that"); res.redirect("back");}
    }

        });
    }
    else
    {
        req.flash("error","You Need To Be Logged In TO DO That!!!");
       res.redirect("back");
    }
 }

 middlewareObj.checkCommentOwnership=function (req,res,next){
    if(req.isAuthenticated())
    {
        comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            res.redirect("back");
            else
            {
                if(foundComment.author.id.equals(req.user._id))
                next();
        else
        {
            req.flash("error","You don't have permission to do that");
       res.redirect("back");}
    }

        });
    }
    else
    {
        req.flash("error","You Need To Be Logged In TO DO That!!!")
       res.redirect("back");
    }
 }

 middlewareObj.isLoggedIn=function (req,res,next)
 {
     if(req.isAuthenticated())
     {return next();}
     req.flash("error","You Need To Be Logged In To Do That!!!!")
     res.redirect("/login");
 }
 module.exports=middlewareObj;

 