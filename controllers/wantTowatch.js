import { To_watch } from "../db/models/to_watch.js";
import { watched } from "../db/models/watched.js";
import sequelize from "../config/sequelize.js";
export const wantToWatch = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        const { imdbID } = req.body;

        if (!req.identity?.id) {
            return res.status(403).json({ Error: 'Unauthorized request' });
        }

        if (!imdbID) {
            return res.status(400).json({ Error: 'imdbID is required' });
        }

        
        const alreadyAdded = await To_watch.findOne({
            where: {
                userId: req.identity.id,
                movieId: imdbID
            },
            transaction
        });

        if (alreadyAdded) {
            await transaction.rollback();
            return res.status(200).json({
                message: "Movie already exists in your waitlist"
            });
        }

        
        await watched.destroy({
            where: {
                movieId: imdbID,
                userId: req.identity.id
            },
            transaction
        });

        
        await To_watch.create({
            userId: req.identity.id,
            movieId: imdbID
        }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            message: `Movie ${imdbID} has been added to your Want To Watch`
        });

    } catch (error) {

        await transaction.rollback();

        console.log(error);

        return res.status(500).json({
            Error: 'Internal Server Error'
        });
    }
};


export const getAllWaitlist = async (req, res) =>{
    try {
        if(req.identity.role !== "user" || !req.identity.id) return res.status(403).json({Error:  "Unauthorised request"})

        const result = await To_watch.findAll({
            where: {userId: req.identity.id}
        })
        if(!result) return res.status(204).json({message: "Empty waitlist"})

        return res.status(200).json({message: "Success", result})

    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}