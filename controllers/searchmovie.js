import { config } from "../config/env.js";
import { movies } from "../db/models/movies.js";
import { searchSchema } from "../schema/validator.js"
import { Op } from "sequelize";
export const searchMovie = async (req, res) =>{
    try {
        let url = `http://www.omdbapi.com/?apiKey=${config.apiKeyOMDB}`;
        const {error, value} = searchSchema.validate(req.body, {abortEarly: false})
        
        if(error) return res.status(400).json({Error: error.message})

        const {title, IMDB, year, type, plot, searchType} = value;
        
        if(searchType === 'one'){
            const response = await movies.findOne({
                where: {
                    ...(year && { year }),
                    ...(type && { type }),
                    ...(plot && { plot }),
                    [Op.or]: [
                    title ? { Title: title } : null,
                    IMDB ? { imdbID: IMDB } : null,
                    ].filter(Boolean)
                }
            });

            if(response.length > 0) return response.status(200).json({message: "Movie found", data: response})
        }

        
        const i = searchType === 'one'? `i=${IMDB}`: undefined;
        const y = `year=${year}`;
        const t = searchType==='one' ? `t=${title}` : `s=${title}`
        const p = searchType === 'one' ? `p=${plot}` : undefined
        const t2 = `type=${type}`

        const params = [title, IMDB, year, type, plot]
        const urlEl = [t, i, y, t2, p]
        params.forEach((param, index) =>{
            if(param){
                url += `&${urlEl[index]}`;
            }
            
        })
        console.log(url)

        const result = await fetch(url)

        const data = await result.json();

        if(!result.ok) return res.status(400).json({message: "Movie not found"});

        const {Title, Year, Released, imdbID, Type, Poster, Country, Language, Plot, Writer, Director, Genre, Runtime, Rated} = data

        if(searchType == "one"){
            await movies.create({
                Title, Year, Released, imdbID, Type, Poster, Country, Language, Plot, Writer, Director, Genre, Runtime, Rated
            })
        }


        return res.status(200).json({message: "Movie found", data})
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: "Imternal server Error"})
    }
}