import { RecipeContext } from '@/context/RecipeContext'
import { Flex } from '@repo/ui/flex'
import { useContext } from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeResults() {
    const { recipes } = useContext(RecipeContext)
    const validRecipes = Array.isArray(recipes) ? recipes : []

    // console.log({ recipes })

    return (
        <Flex className="gap-4 flex-wrap justify-center">
            {validRecipes.length > 0 ? (
                validRecipes.map(({ recipe_id, name, description, ingredient_measurement }) => (

                    <RecipeCard
                        key={recipe_id}
                        recipe_id={recipe_id}
                        description={description}
                        ingredient_measurement={ingredient_measurement}
                        name={name}
                    />
                ))
            ) : (
                <div>No recipes available</div>
            )}
        </Flex>
    )
}
