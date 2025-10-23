import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import "dotenv/config"
import Fruit from "./models/fruits.js"
const app = express();

//config
app.set("view engine", "ejs");



app.use(morgan("dev"));
app.use(express.urlencoded());

app.use(express.static("public"));


const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection Successfully Made")
    } catch (error) {
        console.log("Failed to connect, See error");
        console.log(error)
    }
}
connect();
//routes
app.get("/", (req, res)=>{
    res.render("index")
    console.log("Listening")
})
//render form
app.get("/fruits/new", (req, res)=>{
    res.render("fruits/new");
    console.log("works")
})
app.post("/fruits", async (req, res)=>{
    console.log(req.body   )
    console.log(req.body.isReadyToEat)
    const newFruit = req.body;
})
//connetions
app.listen(3000, ()=>{
    console.log("Server Running on Port 3000")
})