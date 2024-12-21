import { PrismaClient } from '@prisma/client'
import { FastifyBaseLogger } from 'fastify'

export const DEFAULT_LONGITUDE = '0'
export const DEFAULT_LATITUDE = '0'

interface PlantServiceProps {
    logger: FastifyBaseLogger
    prisma: PrismaClient
}

interface CreateVerificationProps {
    user_id: string
}

interface CreateOnePlantProps {
    park_tag_id: string
    type?: string
    longitude?: string
    latitude?: string
    // verification?: CreateVerificationProps[]
}

interface UpdatePlantProps {
    plant_id: string
    params: Partial<CreateOnePlantProps>
}

export class PlantService {
    logger: FastifyBaseLogger
    prisma: PrismaClient

    constructor({ logger, prisma }: PlantServiceProps) {
        this.logger = logger
        this.prisma = prisma
    }

    async createOnePlant(props: CreateOnePlantProps) {
        const { park_tag_id, type, longitude, latitude/*, verification */} = props
        this.logger.info(park_tag_id, 'createOnePlant')
        const plant = await this.prisma.plant.create({
            data: {
                park_tag_id: park_tag_id,
                type: type ?? 'UNKNOWN',
                longitude: longitude ?? DEFAULT_LONGITUDE,
                latitude: latitude ?? DEFAULT_LATITUDE,
                // verifications: {
                //     create: verification?.map(({ user_id }) => ({
                //         user_id: user_id,
                //         verification_status: true, // or false, depending on your logic
                //     })),
                // },
            },
        })
        return plant
    }

    async getAllPlants() {
        this.logger.info('Retrieving all plants')
        const plants = await this.prisma.plant.findMany({
            where: { is_deleted: false },
        })
        return plants
    }

    async updatePlant({ plant_id, params }: UpdatePlantProps) {
        this.logger.info(plant_id, 'updatePlant')
        // const user_id = await this.prisma.user.findFirstOrThrow()
        const plant = await this.prisma.plant.update({
            where: { plant_id },
            data: {
                ...params,
                last_modified_date: new Date(),
            },
        })
        return plant
    }

    async deletePlant(plant_id: string) {
        this.logger.info(plant_id, 'deletePlant')
        const plant = await this.prisma.plant.update({
            where: { plant_id },
            data: { is_deleted: true },
        })
        return plant
    }
}
