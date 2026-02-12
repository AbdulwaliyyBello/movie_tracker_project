import { feedback } from "../db/models/feedback.js";
import { watched } from "../db/models/watched.js";
import sequelize from "../config/sequelize.js";
export const addFeedback = async (req, res) => {
    try {

        if (!req.identity?.id) {
            return res.status(403).json({ Error: "Unauthorised Request" });
        }
        // console.log(Object.keys(feedback.getAttributes()));
        // const tableInfo = await sequelize
        // .getQueryInterface()
        // .describeTable("feedbacks");

        // console.log("this is the actual table info", tableInfo);

        const { review, rating, imdbID } = req.body;

        const numericRating = Number(rating);

        if (!numericRating || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ Error: 'Rating must be between 1 and 5' });
        }

        const hasWatched = await watched.findOne({
            where: { userId: req.identity.id, movieId: imdbID }
        });

        if (!hasWatched) {
            return res.status(404).json({
                message: "You have not watched this movie"
            });
        }

        const [entry, created] = await feedback.upsert({
            userId: req.identity.id,
            imdbID,
            rating: numericRating,
            review
        });

        return res.status(200).json({
            message: created ? "Feedback added" : "Feedback updated",
            entry
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


export const getUserRatings = async (req, res) => {

    try {

        const result = await feedback.findAll({
            where: { userId: req.identity.id }
        });

        if (!result) {
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
