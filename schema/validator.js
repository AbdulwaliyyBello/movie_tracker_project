import Joi from "joi"
export const signupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string()
})

export const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
})

export const searchSchema = Joi.object({
    title: Joi.string().min(2),
    IMDB: Joi.string(),
    year: Joi.string().length(4),
    type: Joi.string().valid("movie", "series", "episode").optional(),
    plot: Joi.string().valid("short", "full").optional(),
    searchType: Joi.string().valid("all", "one").optional()
    }).or("title", "IMDB");