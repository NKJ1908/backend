import UserModel from '../../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import validator from 'validator'

dotenv.config()
const login = async (req, res) => {
    const {email, password} = req.body
    try {
        if (!email || !password) {return res.status(400).json({message: "Email et mot de passe requis"})}
        if (!validator.isEmail(email) ) {return res.status(400).json({message: "Email invalide"})}
        const user = await UserModel.findOne({email})
        if (!user) {return res.status(404).json({message: "Utilisateur introuvable"})}
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {return res.status(401).json({message: "Mot de passe incorrect"})}
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES || '1d'}
        )
        return res.status(200).json({token, user: {id: user._id, nom: user.nom, email: user.email}})
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {res.status(500).json({message: "Erreur lors de la connexion"})}
    }
};

export default login;