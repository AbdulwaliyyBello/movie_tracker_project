import sequelize from "../config/sequelize.js";
import { To_watch } from "../db/models/to_watch.js";
import { watched } from "../db/models/watched.js";
export const addToWatched = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        const { imdbID } = req.body;

        if (!req.identity?.id || req.identity.role !== 'user') {
            return res.status(403).json({ Error: 'Unauthorized request' });
        }

        if (!imdbID) {
            return res.status(400).json({ Error: "imdbID is required" });
        }

        await To_watch.destroy({
            where: {
                userId: req.identity.id,
                movieId: imdbID
            },
            transaction
        });
        const hasWatched = await watched.findOne({
            where: {
                userId: req.identity.id,
                movieId: imdbID
            }
        })

        console.log(hasWatched)
        if(hasWatched) return res.status(201).json({message: "Movie already exists in your watched list"})

        await watched.create({
            userId: req.identity.id,
            movieId: imdbID
        }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            message: `Movie ${imdbID} has been added to your watched list.`
        });

    } catch (error) {

        await transaction.rollback();

        console.log(error);

        return res.status(500).json({
            Error: "Internal server error"
        });
    }
};


export const watchedList = async (req, res) =>{
    try {
        if(req.identity.role !== "user" || !req.identity.id) return res.status(403).json({Error:  "Unauthorised request"})

        const result = await watched.findAll({
            where: {userId: req.identity.id}
        })

        if(result.length < 1) return res.status(204).json({message: "Empty watchList"})

        return res.status(200).json({message: "Success", result})

    } catch (error) {
        console.log(error)

        return res.status(500).json({Error: "Internal server error"})        
    }
}