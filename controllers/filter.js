import { watched } from "../db/models/watched";

export const filter = async (req, res) =>{
    try {
        const id = req.identity.id;
        if(!id) return res.staus(403).json({error: "Unauthorised request"})
        
        const filterBy = req.body;
        const criteria = req.body
        let result;

        switch (filterBy) {
            case 'genre':
                result = await watched.findAll({
                    where: {
                        userId: id
                    },
                    include: [
                        {
                            model: movies,
                            where: {
                                genre: criteria
                            }
                        }
                    ]
                });
                break;
            case 'rating': 
                result = await watched.findAll({
                    where: {
                        userId: id
                    },

                    include: [
                        {
                            model: movies
                        }
                    ],

                    order: [
                        [movies, "rating", "DESC"]
                    ]
                });
                break;
            case 'date':
                result = await watched.findAll({
                    where: {
                        userId: id
                    },

                    include: [
                        {
                            model: movies
                        }
                    ],

                    order: [
                        [movies, "createdAt", "DESC"]
                    ]
                });
            default:
                break;
        }

        if(!result) return res.status(400).json({error: 'Bad request'})

        return res.status(200).json({message: "watched list filtered succesfully", result})
    } catch (error) {
        console.error(error)
        return req.sstats(500).json({Error: 'Internal server Error'})
    }
}