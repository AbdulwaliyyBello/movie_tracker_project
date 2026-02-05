import { User } from '../db/models/user.js';
import { signupSchema } from '../schema/validator.js';
import { signUpHash } from '../utils/bcrypt.js';
import jwt from 'jsonwebtoken';
import {config} from "../config/env.js"
import sequelize from '../config/sequelize.js';
export const signupCont = async (req, res) =>{
    const transaction = await sequelize.transaction()

    try {
        const {error, value} = signupSchema.validate(req.body, {abortEarly: false})

        if(error) return res.status(400).json({Error: error.message})
        
        const { firstName, lastName, email, password} = value;
    
        const exists = await User.findOne({
                where: {email}
            })
        if(exists) return res.status(200).json({Error: `User with email: "${email}" already exists`})
        const encryptedPassword = await signUpHash(password)

        // console.log(encryptedPassword);

        await User.create({
            firstName, lastName, email, password: encryptedPassword,
        }, {transaction})

        const token = jwt.sign({
            email, role: 'user'
        }, config.jwtSecret, {expiresIn: '1h'})

        await transaction.commit();

        return res.status(200).json({message: "Succesfully added new user", value, token})
    } catch (error) {
        await transaction.rollback()
        console.error(error);
        return res.status(500).json({Error: `Internal server error`})
    }
}