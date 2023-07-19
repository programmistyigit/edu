import Joi from "joi"
const ValidateStudent = Joi.object({
    name:Joi.string().required(),
    id:Joi.string().required(),
    gender:Joi.string().required(),
    firstName:Joi.string().required(),
    email:Joi.string().required(),
    birthDay:Joi.string().required(),
    phoneNumber:Joi.string().required(),
    avatar:Joi.string().required(),
    country:Joi.object({
        tuman:Joi.string().required(),
        mahalla:Joi.string(),
        viloyat:Joi.string()
    }),
    rank:Joi.array().items(Joi.object({date:Joi.any().required() , data:Joi.number().required()})).required(),
    classData:Joi.array().items(Joi.object({
        id:Joi.string().required(),
        name:Joi.string().required(),
        groupSpase:Joi.string().required(),
        students:Joi.array().items(Joi.object({name:Joi.string().required() , firstName:Joi.string().required() , id:Joi.string().required() , avatar:Joi.string().required()})).required(),
        ticher:Joi.object({name:Joi.string().required() , firstName:Joi.string().required() , avatar:Joi.string().required()}),
        classProgress:Joi.number().required()
    })).required()
})

export default ValidateStudent