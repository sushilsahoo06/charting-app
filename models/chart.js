const mongoose=require("mongoose");
const chartSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:60
    },
    created_at:{
        type:Number,
        required:true
    }
});
const chart=mongoose.model("chart",chartSchema);//models
module.exports=chart;//export the chart from models