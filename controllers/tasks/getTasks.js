import TaskModel from '../../models/Tasks.js'

export const getTasks = async (req,res)=>{
    try {
        const tasks = await TaskModel.find({userId: req.user.id})
        if (tasks.length === 0) {return res.status(204).json({message: 'Aucune tache trouvée'})}
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur lors de la récupération des tâches'})
    }
}