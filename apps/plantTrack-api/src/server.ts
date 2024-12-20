import Fastify, { FastifyInstance } from 'fastify'
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
export function createServer(): FastifyInstance {
    require('dotenv').config()
    console.log('DATABASE_URL:', process.env.DATABASE_URL)

    const fastify = Fastify({
        logger: {
            transport:
                process.env.NODE_ENV === 'development'
                    ? {
                          target: 'pino-pretty',
                          options: {
                              translateTime: 'HH:MM:ss Z',
                              ignore: 'pid,hostname',
                          },
                      }
                    : undefined,
        },
    }).withTypeProvider<TypeBoxTypeProvider>()
    return fastify
}
