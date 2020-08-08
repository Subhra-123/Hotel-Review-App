var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");
var flash=require("connect-flash");
var mongoose=require("mongoose");
var hotel=require("./models/hotel");
var user=require("./models/user");
var comment=require("./models/comment.js");
mongoose.connect('mongodb+srv://subhra1234:subhra1234@cluster0.pyhwx.mongodb.net/hotel',{
    
     useNewUrlParser: true , useUnifiedTopology: true
});
var commentRoutes=require("./routes/comments");
var resturantRoutes=require("./routes/resturants");
var authRoutes=require("./routes/index");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
// app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());


// Session configuration
app.use(require("express-session")({
    secret:"This is resturant review app",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next();
});
app.use("/hotels" ,resturantRoutes);
app.use("/hotels/:id/comments",commentRoutes);
app.use(authRoutes);
 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
    console.log("Server has started");
});