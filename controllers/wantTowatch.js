import { To_watch } from "../db/models/to_watch.js";
export const wantToWatch = async (req, res) =>{
    try {
        const {movieId} = req.body;

        if(!req.identity.id) return res.status(403).json({Error: 'Unauthorized request'});

        await To_watch.create({
            userId: req.identity.id,
            movieId
        })
        return res.status(200).json({message: `Movie ${movieId} has been added to your Want To Watch`})
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

export const getAllWaitlist = async (req, res) =>{
    try {
        if(req.identity.role !== "user" || !req.identity.id) return res.status(403).json({Error:  "Unauthorised request"})

        const result = await To_watch.findAll({
            where: {userId: req.identity.id}
        })
        if(result.length < 1) return res.status(204).json({message: "Empty waitlist"})

        return res.staus(200).json({message: "Success", result})

    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}