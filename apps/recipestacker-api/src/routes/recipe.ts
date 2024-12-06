import Fastify, { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

// index.js
console.log('DATABASE_URL', process.env.DATABASE_URL)

export const CreateIngredientMeasurementTypeboxType = Type.Object({
    unit: Type.String(),
    quantity: Type.Number(),
    ingredient_id: Type.Optional(Type.String()),
    ingredient_name: Type.Optional(Type.String()),
    ingredient_description: Type.Optional(Type.String()),
})

export const createRecipeTypeBoxType = Type.Object({
    name: Type.String(),
    description: Type.String(),
    measurements: Type.Array(CreateIngredientMeasurementTypeboxType),
})

export const IngredientMeasurementTypeboxType = Type.Object({
    unit: Type.String(),
    quantity: Type.Number(),
    ingredient: Type.Object({
        ingredient_id: Type.Optional(Type.String()),
        name: Type.Union([Type.String(), Type.Null()]),
        description: Type.Union([Type.String(), Type.Null()]),
    }),
})

export const RecipeType = Type.Object({
    recipe_id: Type.String(),
    name: Type.String(),
    description: Type.String(),
    user_id: Type.String(),
    ingredient_measurement: Type.Array(IngredientMeasurementTypeboxType),
})

export const RecipeNotFoundType = Type.Object({
    statusCode: Type.Literal(404),
    message: Type.String(),
    error: Type.Literal('Not Found'),
})

const recipe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.withTypeProvider<TypeBoxTypeProvider>().get(
        '/recipes',
        {
            schema: {
                tags: ['Endpoint: Get all recipes.'],
                description: 'Endpoint to get all recipes',
                response: {
                    200: Type.Array(RecipeType),
                    404: RecipeNotFoundType,
                },
            },
        },
        async function (request: any, reply) {
            return fastify.recipeService.findManyRecipes({
                name: request.query.name,
                sortColumn: request.query.sortColumn,
                sortOrder: request.query.sortOrder,
                take: request.query.take,
                skip: request.query.skip,
            })
        },
    )
    fastify.withTypeProvider<TypeBoxTypeProvider>().get(
        '/recipes/:id',
        {
            schema: {
                tags: ['Endpoint: Get one recipe'],
                description: 'Endpoint to get one recipe',
                response: {
                    200: RecipeType,
                    400: RecipeNotFoundType,
                },
            },
        },
        async function (request: any, reply) {
            return fastify.recipeService.findOneRecipe({
                recipe_id: request.params.id,
            })
        },
    )
    fastify.withTypeProvider<TypeBoxTypeProvider>().post(
        '/recipes',
        {
            schema: {
                tags: ['Endpoint: Create a recipe'],
                description: 'Endpoint to create a recipe',
                body: createRecipeTypeBoxType,
                response: {
                    200: Type.Object({ recipe_id: Type.String() }),
                    400: Type.Object({ message: Type.String() }),
                },
            },
        },
        async function (request, reply) {
            return fastify.recipeService.createOneRecipe({
                name: request.body.name,
                description: request.body.description,
                ingredient_measurement: request.body.measurements,
            })
        },
    )
}

export default recipe
