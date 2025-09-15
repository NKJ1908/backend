import TaskModel from "../../models/Tasks.js"
import validator from 'validator'
export const postTask = async (req,res)=>{
    try {
        const {title,description,priority} = req.body
        if (validator.isEmpty(title || "")) { return res.status(400).json({message : 'Titre requis'})}
        const newTask = new TaskModel({
            title,
            description,
            priority,
            userId: req.user.id,
            status: "pending"
        })
        await newTask.save()
        res.status(201).json(newTask)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur lors de la création de la tâche' })
    }
}
