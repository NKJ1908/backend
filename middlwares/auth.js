import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authVerif = (req, res, next) => {
    const authHeader = req.headers?.authorization
    if (!authHeader) {return res.status(401).json({message: "Token requis"})}
    const token = authHeader.split(" ")[1]
    if (!token) { return res.status(401).json({message: "Token manquant"})}
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({message: "Token invalide ou expire "})
    }
}

export default authVerif