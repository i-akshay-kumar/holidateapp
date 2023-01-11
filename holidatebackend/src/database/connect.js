const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ak5967751:asdfghjas@cluster0.glxygxz.mongodb.net/holidateusers?retryWrites=true&w=majority", {
    useNewUrlParser : true,  
    useUnifiedTopology : true
}).then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log(err);
})

