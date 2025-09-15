import TaskModel from "../../models/Tasks.js"


export const deleteTask = async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await TaskModel.findOneAndDelete({_id:id, userId: req.user.id})
        if (!deleted) {return res.status(404).json({message: "Tache non trouvée"})}
        res.status(200).json({message: "Tâche supprimée avec succès"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la suppression de la tâche"})
    }
}