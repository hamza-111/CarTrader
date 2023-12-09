import Joi from 'joi';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1986).max(new Date().getFullYear()).required(),
    mile: Joi.number().min(0).required(),
    city: Joi.string().min(2).required(),
    numberOfSeat: Joi.number().min(1).max(1000).required(),
    description : Joi.string().min(20).required(),
    features: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
    listerId: Joi.string().required(),
    price: Joi.number().min(0).required(),
    name: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { error, value } = await schema.validate(body);

    if(error) {
        throw createError({
            statusCode : error.statusCode,
            statusMessage : error.message
        })
    }

    const {
        make,
        model,
        year,
        mile,
        city,
        numberOfSeat,
        description,
        features,
        image,
        listerId,
        price,
        name,
    } = body
    const car = await prisma.car.create({
        data: {
            make,
            model,
            year,
            mile,
            city,
            numberOfSeat,
            description,
            features,
            image,
            listerId,
            price,
            name
        }
    })
    return car;
});
