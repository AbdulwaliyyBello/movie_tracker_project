import { watched } from "../db/models/watched.js";
import { movies } from "../db/models/movies.js";
import { feedback } from "../db/models/feedback.js"

watched.belongsTo(movies, {
    foreignKey: "movieId",
    targetKey: "imdbID"
    });

movies.hasMany(watched, {
    foreignKey: "movieId",
    sourceKey: "imdbID"
});


watched.hasOne(feedback, {
    foreignKey: "imdbID",
    sourceKey: "movieId"
});

feedback.belongsTo(watched, {
    foreignKey: "imdbID",
    targetKey: "movieId"
});

