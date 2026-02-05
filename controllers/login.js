import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { loginSchema } from '../schema/validator.js';
import { User } from '../db/models/user.js';
export const loginCont = async (req, res) =>{
    try {
        const {error, value} = loginSchema.validate(req.body, {abortEarly: false});
        if(error) return res.status(400).json({Error: error.message})
        const {email, password} = value;

        const exists = await User.findOne({
            where: {email}
        })

        if(!exists) return res.status(404).json({Error: 'Invalid Credentials'})

        const user = await exists.toJSON();

        if (user){

            const isValid =  await verifyPassword(password, user.password)

            if(isValid){
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    },
                    config.jwtSecret,
                    { expiresIn: "1h" }
                );
    
    
                return res.status(200).json({status: "success", token})
            }
            return res.status(400).json({status: "Invalid Credentials"})
        }
        return res.status(404).json({status: "Invalid Credentials"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({Error: `Internal server error`})
    }
}