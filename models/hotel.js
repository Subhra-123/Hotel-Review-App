var mongoose=require("mongoose");
var comment=require("./comment.js");
var hotelSchema=new mongoose.Schema({
    name:String,
    image1:String,
    image2:String,
    image3:String,
    description:String,
    price:String,
    location:String,
    website:String,
    contact:String,
    booking:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    comments:[{
               type:mongoose.Schema.Types.ObjectId,
               ref:"comment"
    }]
});
module.exports=mongoose.model("hotel",hotelSchema );