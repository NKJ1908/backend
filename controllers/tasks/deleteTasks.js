import TaskModel from "../../models/Tasks.js"


export const deleteTasks = async (req, res) => {
const {confirm} = req.query
if (confirm !== "true") {
    return res.status(400).json({message: "Confirmez la suppression en ajoutant ?confirm=true"})}
    try {
        const deleted = await TaskModel.deleteMany({userId: req.user.id})
        if (deleted.deletedCount === 0) {return res.status(404).json({message: "Aucune tâche à supprimer"})}
        res.status(200).json({message: `${deleted.deletedCount} tâches supprimées`})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la suppression de la tâche"})
    }
}