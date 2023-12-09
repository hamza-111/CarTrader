import Joi from "joi"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const schema = Joi.object({
    email : Joi.string().email({
        minDomainSegments : 2,
        tlds : {allow : ["com", "net"]}
    }).required(),
    phone : Joi.string().length(10).pattern(/^(\+33|0)[1-9](\d{8}|\d{9})$/).required(),
    name : Joi.string().required(),
    message : Joi.string().min(20).required()
})
export default defineEventHandler(async (event)=> {
    const body = await readBody(event)
    const {listingId} = event.context.params;
    const {error} = await schema.validate(body)
    

    if(error) {
        throw createError({
            statusCode : error.value,
            statusMessage : error.message
        })
    }
    const {message, name, email, phone} = body
    return prisma.message.create({
        data : {
            email,
            message,
            phone,
            name,
            listingId:parseInt(listingId)
        }
    })
})