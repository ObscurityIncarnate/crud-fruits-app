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
app.get("/fruits", async (req, res)=>{
    try {
       const allFruits = await Fruit.find();
        res.render("fruits/index",{
            allFruits,
        }); 
    } catch (error) {
        console.log("Failed to find all the fruits");
        console.log(error);
    }
    
})
app.post("/fruits", async (req, res)=>{
    console.log(req.body   )
    req.body.isReadyToEat =  !!req.body.isReadyToEat;
    const newFruit = req.body;
    console.log(newFruit)
    Fruit.create(newFruit);
    res.redirect("/fruits")
})
app.get("/fruits/:fruitId", async (req, res)=>{
    console.log(req.params.fruitId)
    const fruitId =req.params.fruitId;
 
    try {
        const fruit = await Fruit.findById(fruitId);
            res.render("fruits/show",{
                fruit,
            }); 
    } catch (error) {
            console.log("Failed to find the fruit");
            console.log(error);
    }

    
    
})
//connetions
app.listen(3000, ()=>{
    console.log("Server Running on Port 3000")
})