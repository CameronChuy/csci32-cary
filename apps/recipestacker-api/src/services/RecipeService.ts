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

interface FindOneRecipeProps {
    recipe_id: string
}

interface FindManyRecipeProps {
    name?: string
    ingredients?: string
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

interface UpdateOneRecipeProps {
    recipe_id: string
    name: string
    description: string
    ingredient_measurement: CreateIngredientMeasurementProps[]
}

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

    async findOneRecipe(props: FindOneRecipeProps) {
        this.logger.info({ props }, 'findOneRecipe')
        const { recipe_id } = props
        return this.prisma.recipe.findFirst({
            where: {
                recipe_id,
            },
            include: {
                ingredient_measurement: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        })
    }

    async updateOneRecipe(props: UpdateOneRecipeProps) {
        this.logger.info({ props }, 'updateOneRecipe')
        const { recipe_id } = props
        const { user_id } = await this.prisma.user.findFirstOrThrow()
        const { ingredient_measurement, ...rest } = props
        const updatedRecipe = await this.prisma.recipe.update({
            where: {
                recipe_id,
            },
            data: {
                ...rest,
                user: {
                    connect: { user_id: user_id },
                },
                ingredient_measurement: {
                    upsert: ingredient_measurement?.map(
                        ({ ingredient_id, quantity, unit, ingredient_name, ingredient_description }) => ({
                            where: {
                                ingredient_id_recipe_id: {
                                    ingredient_id: ingredient_id || '',
                                    recipe_id,
                                },
                            },
                            update: {
                                quantity,
                                unit,
                            },
                            create: {
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
                                unit,
                                quantity,
                            },
                        }),
                    ),
                },
            },
        })
    }

    async findManyRecipes(props: FindManyRecipeProps) {
        this.logger.info({ props }, 'findManyRecipes')
        const {
            name,
            ingredients,
            sortColumn = 'name',
            sortOrder = SortOrder.ASC,
            take = DEFAULT_TAKE,
            skip = DEFAULT_SKIP,
        } = props
        const ingredientsArray = ingredients ? ingredients.split(',') : []
        this.logger.info({ ingredientsArray }, 'findManyRecipes')
        const orderBy = this.getRecipeOrderBy({ sortColumn, sortOrder })
        const recipes = await this.prisma.recipe.findMany({
            where: {
                name: {
                    contains: name,
                },
                AND: ingredientsArray.map((ingredient) => ({
                    ingredient_measurement: {
                        some: {
                            ingredient: {
                                name: {
                                    contains: ingredient,
                                },
                            },
                        },
                    },
                })),
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
        return recipes
    }

    async createOneRecipe(props: CreateOneRecipeProps) {
        const { name, description, ingredient_measurement } = props
        this.logger.info(ingredient_measurement, 'createOneRecipe')
        const { user_id } = await this.prisma.user.findFirstOrThrow()
        const recipe = await this.prisma.recipe.create({
            data: {
                user: {
                    connect: {
                        user_id: user_id,
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
