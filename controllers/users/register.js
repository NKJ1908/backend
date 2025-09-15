import bcrypt from "bcryptjs";
import UserModel from "../../models/Users.js";
import validator from "validator";
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { email, nom, password, role } = req.body;
    if (validator.isEmpty(email || "")) {
      return res.status(400).json({ message: "Ce champ est requis" });
    }
    if (validator.isEmpty(nom || "")) {
      return res.status(400).json({ message: "Ce champ est requis" });
    }
    if (validator.isEmpty(password || "")) {
      return res.status(400).json({ message: "Ce champ est requis" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }
    const existed = await UserModel.findOne({ email });
    if (existed) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      nom,
      email,
      password: hashedPassword
    });

    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );
    return res
      .status(200)
      .json({ token, user: { id: newUser._id, nom: newUser.nom, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(503).json({ message: "Erreur lors de votre inscription" });
  }
};

export default register;
