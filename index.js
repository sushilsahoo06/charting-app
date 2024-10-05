const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const chart=require("./models/chart.js")//
mongoose.set('debug', true);
const methodOverride = require('method-override');//delete 
//const Chart = require(path.join(__dirname, 'models', 'chart.js'));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));//post requiest
app.use(methodOverride('_method'));

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});

main().then((res)=>{
    console.log("connections succesfull !!");
}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatShap',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000,
    });
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//index route
app.get("/chat",async (req,res)=>{
    try{
        let charts= await chart.find();
        res.render("index.ejs",{charts})
        //console.log(charts);
        //res.send("working !!");
    }catch(err){
        console.log(err);
    }
});
//creat new chat
app.get("/chat/new",(req,res)=>{
    try{
        res.render("new.ejs");
    }catch(err){
        console.log(err);
    }
});
app.post("/chat",(req,res)=>{
    try{
        let {from ,msg,to}=req.body;
        let newchat=new chart({
            from:from,
            msg:msg,
            to:to,
            created_at:new Date()
        });
        newchat.save().then((res)=>{
            console.log("chat was saved !!");
        }).catch(err=>console.log(err));
        res.redirect("/chat");
    }catch(err0r){
        console.log(err0r);
    }

});
//edit route
app.get("/chat/:id/edit",async(req,res)=>{
    try{
        let{id}=req.params;
        let findId=await chart.findById(id);
        res.render("edit.ejs",{findId});
    }catch(err){
        console.log(err);
    }
});
//update route
app.patch("/chat/:id",async(req,res)=>{
    try{
        let {id}=req.params;
        let {msg:newmsg}=req.body;
        let updateChat=await chart.findByIdAndUpdate(id,{msg:newmsg});
        console.log(updateChat);
        res.redirect("/chat");

    }catch(err){
        console.log(err);
    }
});
//delete route
app.delete("/chat/:id",async(req,res)=>{
    try{
        let{id}=req.params;
        let deletechat=await chart.findByIdAndDelete(id);
        console.log(deletechat);
        res.redirect("/chat");

    }catch(err){
        console.log(err);
    }
});

app.get("/",(req,res)=>{
    res.send("server is working !!");
});


