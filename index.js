const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const chart=require("./models/chart.js")//
mongoose.set('debug', true);
const methodOverride = require('method-override');//delete 
const expressError=require("./expressError");
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
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatShap',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000,
    });
}
//index route
app.get("/chat",asyncWrap(async(req,res,next)=>{
        let charts= await chart.find();
        res.render("index.ejs",{charts})
        //console.log(charts);
        //res.send("working !!");

}));
//creat new chat
app.get("/chat/new",(req,res,next)=>{ 
    try{
        const condition=true;
        if(!condition){
            throw new expressError(404,"page not found !!");
        }      
        res.render("new.ejs");
    } catch(err){
        next(err)
    }
});
app.post("/chat",async(req,res,next)=>{
    try{
        let {from ,msg,to}=req.body;
        let newchat=new chart({
            from:from,
            msg:msg,
            to:to,
            created_at:new Date()
        });
        await newchat.save();
        res.redirect("/chat");
    }catch(err){
        next(err)
    }
});
//edit route
app.get("/chat/:id/edit",asyncWrap(async(req,res)=>{
        let{id}=req.params;
        let findId=await chart.findById(id);
        res.render("edit.ejs",{findId});
}));
//update route
app.patch("/chat/:id",asyncWrap(async(req,res)=>{
        let {id}=req.params;
        let {msg:newmsg}=req.body;
        let updateChat=await chart.findByIdAndUpdate(id,{msg:newmsg});
        console.log(updateChat);
        res.redirect("/chat");
}));
//delete route
app.delete("/chat/:id",asyncWrap(async(req,res,next)=>{
        let{id}=req.params;
        let deletechat=await chart.findByIdAndDelete(id);
        console.log(deletechat);
        res.redirect("/chat");
}));

function asyncWrap(fn) {
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    };
}
//New-show route
app.get("/chat/:id",asyncWrap(async(req,res,next)=>{

    let{id}=req.params;
    let chat= await chart.findById(id);
    if(!chat){
        next( new expressError(404,"chat not found !"));  
    }
     res.render("show.ejs",{chat});
    
}));
app.get("/",(req,res)=>{
    res.send("server is working !!");
});

const handlevalidationError=(err)=>{
    console.log("this was a validation error !");
    console.dir(err)
    return err;
};
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name ==="validationError"){
       err= handlevalidationError(err)
    }
    next(err);
});
// erroe handling middlewire
app.use((err,req,res,next)=>{
    let{status=500, message="some error occured !"}=err
    res.status(status).send(message)
});

app.use((req, res) => {
    res.status(404).send("page not found!!"); // Render custom 404 page
});
