import mongoose from "mongoose";

const model = {
    name:{type: String, required: true, unique: true},
    isReadyToEat: {type: Boolean, default: true}
}
const Fruit =  await mongoose.model("Fruit", model);
export default Fruit;