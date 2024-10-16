const mongoose=require('mongoose');
const chart=require("./models/chart.js")//


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
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const allChart=[
    {
        from:"kelly",
        to:"adom",
        msg:"hii ,my name is adom",
        created_at:new Date()
    },
    {
        from:"kamla herish",
        to:"biden",
        msg:"you take the election campening of d.party",
        created_at:new Date()
    },
    {
        from:"macron",
        to:"Gail",
        msg:"hii,i prmot your new write book",
        created_at:new Date()
    },
    {
        from:"adom khoo",
        to:"minervini",
        msg:"how are you !",
        created_at:new Date()
    },
    {
        from:"peater",
        to:"mark",
        msg:"hii",
        created_at:new Date()
    },
    {
        from:"andrew tate",
        to:"trump",
        msg:"i help your election campaning",
        created_at:new Date()
    }
]
//chart.insertMany(allChart);