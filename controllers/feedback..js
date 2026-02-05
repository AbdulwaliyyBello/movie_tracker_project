import { feedback } from "../db/models/feedback.js";
import { watched } from "../db/models/watched.js";

export const addFeedback = async (req, res) => {
    try {
        if(!req.identity.id) return res.status(403).json({Error: "Unauthorised Request"})

        const {review, rating, imdbID} = req.body;

        if (5 < parseInt(rating) || parseInt(rating) < 1) return res.status(400),json({Error: 'Invalid input'})

        const has_watched = await watched.findOne({
            where: {userId: req.identity.id, imdbID}
        });

        if(has_watched.length < 1) return res.status(404).json({message: "You have not watched this movie"})
        
        const [entry, created] = await feedback.upsert({
            userId: req.identity.id,
            movieId,
            rating,
            review
        });

        return res.status(200).json({
            message: created ? "feedback added" : "feedback updated",
            entry
        });

    } catch (error) {
        console.error(error)
        return res.atus(500).json({error: "Internal Server Error"})
    }
}

export const getUserRatings = async (req, res) => {

    try {

        const result = await feedback.findAll({
            where: { userId: req.identity.id }
        });

        if (!result.length) {
            return res.status(204).json({ message: "No ratings yet" });
        }

        return res.status(200).json({
            message: "Success",
            result
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
