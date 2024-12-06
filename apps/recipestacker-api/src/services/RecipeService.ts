import { Prisma, PrismaClient } from '@prisma/client'
import { create } from 'domain'
import { FastifyBaseLogger } from 'fastify'

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export const DEFAULT_TAKE = 15
export const DEFAULT_SKIP = 0

interface RecipeServiceProps {
    logger: FastifyBaseLogger
    prisma: PrismaClient
}

interface FindOneRecipeProps {}

interface FindManyRecipeProps {
    name?: string
    sortColumn?: string
    sortOrder?: SortOrder
    take?: number
    skip?: number
}

interface CreateIngredientMeasurementProps {
    ingredient_id?: string
    ingredient_name?: string
    ingredient_description?: string
    unit: string
    quantity: number
}

interface UpdateOneRecipeProps {}

interface CreateOneRecipeProps {
    name: string
    description: string
    ingredient_measurement: CreateIngredientMeasurementProps[]
}

interface GetRecipeOrderByProps {
    sortColumn: string
    sortOrder: SortOrder
}

export class RecipeService {
    logger: FastifyBaseLogger
    prisma: PrismaClient

    constructor({ logger, prisma }: RecipeServiceProps) {
        this.logger = logger
        this.prisma = prisma
    }

    getRecipeOrderBy({
        sortOrder,
        sortColumn,
    }: GetRecipeOrderByProps):
        | Prisma.RecipeOrderByWithRelationInput
        | Prisma.RecipeOrderByWithRelationInput[]
        | undefined {
        return {
            [sortColumn]: sortOrder,
        }
    }

    async findOneRecipe({}: FindOneRecipeProps) {}

    async updateOneRecipe(props: UpdateOneRecipeProps) {}

    async findManyRecipes(props: FindManyRecipeProps) {
        this.logger.info({ props }, 'findManyRecipes')
        const { name, sortColumn = 'name', sortOrder = SortOrder.ASC, take = DEFAULT_TAKE, skip = DEFAULT_SKIP } = props
        const orderBy = this.getRecipeOrderBy(sortColumn, sortOrder)
            return this.prisma.recipe.findMany({
                where: {
                    name,
                },
                orderBy,
                take,
                skip,
                include: {
                    ingredient_measurement: {
                        include: {
                            ingredient: true,
                        },
                    },
                },
            })
    }

    async createOneRecipe(props: CreateOneRecipeProps) {
        const { name, description, ingredient_measurement } = props
        const spoof_user_id = 'cm4bbgy5200002uto24lwggl2'
        const recipe = await this.prisma.recipe.create({
            data: {
                user: {
                    connect: {
                        user_id: spoof_user_id,
                    },
                },
                name,
                description,
                ingredient_measurement: {
                    create: ingredient_measurement.map(
                        ({ ingredient_id, ingredient_name, ingredient_description, unit, quantity }) => ({
                            ingredient: ingredient_id
                                ? {
                                      connect: {
                                          ingredient_id,
                                      },
                                  }
                                : {
                                      create: {
                                          name: ingredient_name,
                                          description: ingredient_description,
                                      },
                                  },
                            quantity,
                            unit,
                        }),
                    ),
                },
            },
        })
        return recipe
    }
}

/*
                    {
                        connect: {
                            user_id: spoof_user,
                        },
                    },
                */

/*

                ingredient_measurement: ingredient_measurement.map((ingredientMeasurement) => {
                    return {
                        connectOrCreate: {
                            create: {
                                ingredient: {
                                    connectOrCreate: {
                                        create: {
                                            name,
                                        },
                                    },
                                },
                            },
                        },
                    }
                }),

*/
