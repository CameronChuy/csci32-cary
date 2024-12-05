import Fastify, { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

// index.js
console.log('DATABASE_URL', process.env.DATABASE_URL)

export const CreateIngredientMeasurementTypeboxType = Type.Object({
    unit: Type.String(),
    quantity: Type.Number(),
    ingredient_id: Type.Optional(Type.String()),
    ingredient_name: Type.String(),
    ingredient_description: Type.String(),
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
/*
export const RecipeType = Type.Object({
    recipe_id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  user_id: Type.String(),
  ingredient_measurement: IngredientMeasurementTypeboxType,
  user_id: Type.String()
})
*/
const recipe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    // fastify.withTypeProvider<TypeBoxTypeProvider>().get('/recipes', {
    //     schema: {
    //         schema: {
    //             tags: ['Endpoint: Get all recipes.'],
    //             description: 'Endpoint to get all recipes',
    //             body: createRecipeTypeBoxType,
    //             response: {
    //                 200: Type.Array( /* REcip type */),
    //                 404: /* Recipe not found type */
    //             },
    //         },
    //     },
    // })
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
