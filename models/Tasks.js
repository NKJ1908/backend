import mongoose from "mongoose";

const taskschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    priority: {
        type: String,
        enum: ["Basse","Moyenne","Urgente"],
        default: "Basse"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    status:{
        type: String,
        enum: ["complete","pending"],
        default: "pending"
    }
},{timestamps: true}
)

const TaskModel = mongoose.model("Task", taskschema)
export default TaskModel
