const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log("Database Connection Error:", err);
})
