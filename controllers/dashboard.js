import { watched } from "../db/models/watched.js";
import { To_watch } from "../db/models/to_watch.js";
import { feedback } from "../db/models/feedback.js";
import { movies } from "../db/models/movies.js";
import { Sequelize, Op } from "sequelize";

export const getDashboardStats = async (req, res) => {

    try {

        const userId = req.identity.id;

        if (!userId) {
            return res.status(403).json({
                error: "Unauthorized request"
            });
        }


        const totalWatched = await watched.count({ where: { userId } });

        const totalWant = await To_watch.count({ where: { userId } });

        const avgRating = await feedback.findOne({
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"]
            ],
            where: { userId }
        });



        const watchedMovies = await watched.findAll({

            where: { userId },

            include: [
                {
                    model: movies,
                    attributes: [
                        "title",
                        "poster",
                        "genre",
                        "year",
                        "imdbID"
                    ]
                },
                {
                    model: feedback,
                    attributes: ["rating", "review"],
                    required: false
                }
            ],

            order: [["createdAt", "DESC"]],

            limit: 10   
        });

        const wantMovies = await To_watch.findAll({

            where: { userId },

            include: [
                {
                    model: movies,
                    attributes: [
                        "title",
                        "poster",
                        "genre",
                        "year",
                        "imdbID"
                    ]
                }
            ],

            order: [["createdAt", "DESC"]],

            limit: 10
        });

        return res.status(200).json({

            message: "Dashboard fetched successfully",

            stats: {
                totalWatched,
                totalWant,
                averageRating: avgRating?.dataValues?.averageRating || 0
            },

            watchedMovies,
            wantToWatchMovies: wantMovies

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
