import { config } from "../config/env.js";
import { movies } from "../db/models/movies.js";
import { searchSchema } from "../schema/validator.js";
import { Op } from "sequelize";

export const searchMovie = async (req, res) => {
    try {

        let url = `http://www.omdbapi.com/?apiKey=${config.apiKeyOMDB}`;

        const { error, value } = searchSchema.validate(req.query, { abortEarly: false });
        if (error) return res.status(400).json({ Error: error.message });

        const { title, IMDB, year, type, plot, searchType } = value;

        if (searchType === "one") {

            const response = await movies.findOne({
                where: {
                    ...(year && { Year: year }),
                    ...(type && { Type: type }),
                    ...(plot && { Plot: plot }),
                    [Op.or]: [
                        title ? { Title: title } : null,
                        IMDB ? { imdbID: IMDB } : null,
                    ].filter(Boolean)
                }
            });

            if (response) {
                return res.status(200).json({
                message: "Movie found in database",
                data: response
                });
            }
        }


        const i = searchType === "one" ? `i=${IMDB}` : undefined;
        const y = year ? `y=${year}` : undefined;
        const t = searchType === "one" ? `t=${title}` : `s=${title}`;
        const p = searchType === "one" ? `plot=${plot}` : undefined;
        const t2 = type ? `type=${type}` : undefined;

        const params = [title, IMDB, year, type, plot];
        const urlEl = [t, i, y, t2, p];

        params.forEach((param, index) => {
        if (param && urlEl[index]) {
            url += `&${urlEl[index]}`;
        }
        });

        console.log(url);

        const result = await fetch(url);
        const data = await result.json();

        
        if (data.Response === "False") {
        return res.status(404).json({ message: data.Error });
        }


        if (searchType === "one") {

        const {
            Title, Year, Released, imdbID, Type,
            Poster, Country, Language, Plot,
            Writer, Director, Genre, Runtime, Rated
        } = data;

        try {
            await movies.create({
            Title, Year, Released, imdbID, Type,
            Poster, Country, Language, Plot,
            Writer, Director, Genre, Runtime, Rated
            });
        }
        catch (err) {


            const existing = await movies.findOne({
            where: { imdbID }
            });

            if (existing) {
            return res.status(200).json({
                message: "Movie already exists in database",
                data: existing
            });
            }

            throw err;
        }
        }

        return res.status(200).json({
        message: "Movie found",
        data
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal server Error" });
    }
};
