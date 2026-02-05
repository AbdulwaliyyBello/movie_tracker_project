import sequelize from "../config/sequelize.js";
import { To_watch } from "../db/models/to_watch.js";
import { watched } from "../db/models/watched.js";
export const addToWatched = async (req, res) =>{
    const transaction = await sequelize.transaction()
    
    try {
        const movieId = req.body.movieId;

        if(!req.identity.id || req.identity.role !== 'user') return res.status(403).json({Error: 'Unsauthorized request'});

        await To_watch.destroy({
            where: {userId: req.identity.id, movieId}
        }, {transaction});

        await watched.create({
            userId: req.identity.id,
            movieId
        }, {transaction})

        await transaction.commit()

        return response.status(200).json({message: `Movie ${movieId} has been added to your watched list.`})

    } catch (error) {

        await transaction.rollback()

        console.log(error)

        return res.status(500).json({Error: "Internal server error"})
    }
}

export const watchedList = async (req, res) =>{
    try {
        if(req.identity.role !== "user" || !req.identity.id) return res.status(403).json({Error:  "Unauthorised request"})

        const result = await watched.findAll({
            where: {userId: req.identity.id}
        })

        if(result.length < 1) return res.status(204).json({message: "Empty watchList"})

        return res.staus(200).json({message: "Success", result})

    } catch (error) {
        console.log(error)

        return res.status(500).json({Error: "Internal server error"})        
    }
}