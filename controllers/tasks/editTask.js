import TaskModel from "../../models/Tasks.js"

export const editTask = async (req, res) => {
    const {id} = req.params
    const updates = req.body

    try {
        if (updates.userId) {
      delete updates.userId;
    }
        const updated = await TaskModel.findOneAndUpdate({_id:id, userId:req.user.id}, updates, {new: true, runValidators: true})
        if (!updated) { return res.status(404).json({message: "Tache non trouvée"})}
        res.status(200).json(updated)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la modification"})
    }
}