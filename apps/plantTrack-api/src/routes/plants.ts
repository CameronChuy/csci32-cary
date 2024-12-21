import Fastify, { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { PrismaClient } from '@prisma/client'
import { PlantService } from '../services/PlantService'

export const PlantType = Type.Object({
    plant_id: Type.String(),
    park_tag_id: Type.String(),
    type: Type.String(),
    longitude: Type.String(),
    latitude: Type.String(),
    uploaded_date: Type.String(),
    last_modified_date: Type.String(),
    is_deleted: Type.Boolean(),
    //Verification: Type.Array(VerificationType),
})

export const createPlantType = Type.Object({
    park_tag_id: Type.String(),
    type: Type.String(),
    longitude: Type.String(),
    latitude: Type.String(),
    // verification: Type.Optional(Type.Array(Type.Object({
    //     user_id: Type.String(),
    // }))),
})

export const updatePlantType = Type.Object({
    park_tag_id: Type.String(),
    type: Type.String(),
    longitude: Type.String(),
    latitude: Type.String(),
    // verification: Type.Optional(Type.Array(Type.Object({
    //     user_id: Type.String(),
    // }))),
})

const plantRoutes: FastifyPluginAsync = async (fastify, opts) => {
    // Initialize Prisma Client and PlantService
    const prisma = new PrismaClient()
    const plantService = new PlantService({ logger: fastify.log, prisma })

    // Decorate Fastify instance with PlantService
    fastify.decorate('PlantService', plantService)

    fastify.withTypeProvider<TypeBoxTypeProvider>().post(
        '/plants',
        {
            schema: {
                tags: ['Endpoint: Create a plant'],
                description: 'Endpoint to create a plant',
                body: createPlantType,
                response: {
                    200: Type.Object({ park_tag_id: Type.String() }),
                    400: Type.Object({ message: Type.String() }),
                },
            },
        },
        async function (request, reply) {
            try {
                const plant = await fastify.PlantService.createOnePlant({
                    park_tag_id: request.body.park_tag_id,
                    type: request.body.type,
                    longitude: request.body.longitude,
                    latitude: request.body.latitude,
                    // verification: request.body.verification,
                })
                reply.send(plant)
            } catch (error) {
                fastify.log.error(error)
                reply.status(400).send({ message: error.message })
            }
        },
    )

    fastify.withTypeProvider<TypeBoxTypeProvider>().get(
        '/plants',
        {
            schema: {
                tags: ['Endpoint: Get all plants'],
                description: 'Endpoint to get all plants',
                response: {
                    200: Type.Array(PlantType),
                    400: Type.Object({ message: Type.String() }),
                },
            },
        },
        async function (request, reply) {
            try {
                const plants = await fastify.PlantService.getAllPlants()
                reply.send(plants)
            } catch (error) {
                fastify.log.error(error)
                reply.status(400).send({ message: error.message })
            }
        },
    )

    fastify.withTypeProvider<TypeBoxTypeProvider>().put(
        '/plants/:plant_id',
        {
            schema: {
                tags: ['Endpoint: Update a plant'],
                description: 'Endpoint to update a plant',
                body: updatePlantType,
                params: Type.Object({
                    plant_id: Type.String(),
                }),
                response: {
                    200: PlantType,
                    400: Type.Object({ message: Type.String() }),
                },
            },
        },
        async function (request, reply) {
            try {
                const plant = await fastify.PlantService.updatePlant({
                    plant_id: request.params.plant_id,
                    params: request.body,
                })
                reply.send(plant)
            } catch (error) {
                fastify.log.error(error)
                reply.status(400).send({ message: error.message })
            }
        },
    )

    fastify.withTypeProvider<TypeBoxTypeProvider>().put(
        '/plants/:plant_id/delete',
        {
            schema: {
                tags: ['Endpoint: Delete a plant'],
                description: 'Endpoint to delete a plant',
                params: Type.Object({
                    plant_id: Type.String(),
                }),
                response: {
                    200: PlantType,
                    400: Type.Object({ message: Type.String() }),
                },
            },
        },
        async function (request, reply) {
            try {
                const plant = await fastify.PlantService.deletePlant(request.params.plant_id)
                reply.send(plant)
            } catch (error) {
                fastify.log.error(error)
                reply.status(400).send({ message: error.message })
            }
        },
    )
}

export default plantRoutes
