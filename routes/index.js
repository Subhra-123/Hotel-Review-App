var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
 
}); 




router.get("/register",function(req,res){
    res.render("register");
});
 router.post("/register",function(req,res){
     var newUser=new user({username:req.body.username});
   user.register(newUser,req.body.password,function(err,user){
   if(err)
   {
       req.flash("error",err.message);
       return res.redirect("/register");
   }
   else
   {
       passport.authenticate("local")(req,res,function(){
           req.flash("success", "Welcome"+user.username);
           res.redirect("/hotels");
       });
   }
   });
 });
 
 router.get("/login",function(req,res){
     res.render("login");
 });
 router.post("/login", passport.authenticate("local",
 {successRedirect:"/hotels",failureRedirect:"/login"})
 ,function(req,res){
   
 });
 //logout route
 router.get("/logout",function(req,res){
     req.logout();
     req.flash("success","Logged you Out!");
     res.redirect("/hotels");
 });
 
 module.exports=router;