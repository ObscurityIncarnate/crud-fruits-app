import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import "dotenv/config"
import Fruit from "./models/fruits.js"
import methodOverride from "method-override"
const app = express();

//config
app.set("view engine", "ejs");



app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(methodOverride('_method'))
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
        res.status(500).send("Something went wrong");
        console.log("Failed to find all the fruits");
        console.log(error);
    }
    
})
app.post("/fruits", async (req, res)=>{
    console.log(req.body   )
    req.body.isReadyToEat =  !!req.body.isReadyToEat;
    const newFruit = req.body;
    console.log(newFruit)
    try {
        await Fruit.create(newFruit);
        res.redirect(`/fruits/`)
    } catch (error) {
        res.status(409).send("Already exists");
    }
    
    // console.log(Fruit.find(newFruit))
    
})
app.delete("/fruits/:fruitId", async (req, res) =>{
    try {
        const fruitId = req.params.fruitId;
        const deletedFruit =  await Fruit.findByIdAndDelete(fruitId);
        res.redirect("/fruits");
    } catch (error) {
        res.status(500).send("Something went Wrong")
    }
})
app.get("/fruits/:fruitId", async (req, res)=>{
    // console.log(req.params.fruitId)
    // const fruitId =req.params.fruitId;
 
    // try {
    //     const fruit = await Fruit.findById(fruitId);
    //         res.render("fruits/show",{
    //             fruit,
    //         }); 
    // } catch (error) {
    //         console.log("Failed to find the fruit");
    //         console.log(error);
    // }

    console.log(req.params.fruitId)

    const fruitId =req.params.fruitId;

    try {

        const fruit = await Fruit.findById(fruitId);
        if (!fruit) return res.status(404).send("Fruit not Found")

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