import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
    await fastify.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'RecipeStacker API',
                description: 'An API for creating and tracking recipes.',
                version: '0.1.0',
            },
            servers: [
                {
                    url: 'http://127.0.0.1:7000',
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'apiKey',
                        in: 'header',
                    },
                },
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
        },
    })

    await fastify.register(fastifySwaggerUI, { routePrefix: '/docs' })
})
