import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../db/models/user.js";

export const verifyUser = async (req, res, next) =>{
    try {
        const jwtHeader = req.authorization;
        if(!jwtHeader)  return res.status(401).json({Error: 'Missing JWT. Please Log in'})
        
        const token = jwtHeader.split(" ")[1];

        if(!jwt) return res.status(401).json({Error: "JWT is Missing"})

        jwt.verify(token, config.jwtSecret, async (error, user)=>{
            if(error){
                console.log(error)
                return res.status(401).json({Error: error.message})
            }

            if(user.role !== 'user'){
                return res.status(401).json({Error: 'Unauthorised request'})

            }
            const result = await User.findOne({
                where: {id: user.id}
            })
            if(!result.id) return res.status(401).json({Error: "User not found, please log in"})
            req.identity = user;
            next()
        });
    } catch (error) {
        
    }
}