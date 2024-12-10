import { IngredientMeasurement, RecipeContext } from '@/context/RecipeContext'
import { deleteRecipe, getRecipe } from '@/hooks/useRecipes'
import { Button } from '@repo/ui/button'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'
import { useContext } from 'react'

// props
export type RecipeCardProps = {
    recipe_id: string
    name: string | null
    description: string | null
    ingredient_measurement: IngredientMeasurement[] | null
}

export default function RecipeCard({ name, description, ingredient_measurement, recipe_id }: RecipeCardProps) {
    const { mutate, setShowRecipeForm, setRecipeId, setRecipe } = useContext(RecipeContext)
    console.log(ingredient_measurement)
    return (
        <div className="border-2 border-solid rounded-md border-red-500 bg-red-50 basis-1/4 shadow-md min-w-56 flex-grow p-2">
            <Flex className="justify-between gap-2 bg-red-200 w-full p-4 flex-wrap rounded-md">
                <Header variant="h5" className="justify-between">
                    {name}
                </Header>
                <Flex className="gap-2">
                    <Button
                        size={Size.XSMALL}
                        variant={Variant.PRIMARY}
                        onClick={async () => {
                          const newRecipe = await getRecipe(recipe_id)
                          setRecipeId(recipe_id)
                          setRecipe(newRecipe)
                          setShowRecipeForm(true)
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        size={Size.XSMALL}
                        variant={Variant.PRIMARY}
                        onClick={async() => {
                            await deleteRecipe(recipe_id)
                            mutate()
                            alert(`Recipe ${name} deleted`)
                        }}
                    >
                        Delete
                    </Button>
                </Flex>
            </Flex>
            <div className="p-4 bg-red-100 w-full flex flex-col gap-4">
                <p>{description}</p>
                <ul className="ml-2 p-2 bg-red-200 flex flex-col rounded-md w-full">
                    {ingredient_measurement?.map(({ quantity, unit, ingredient }, index) => (
                        <li key={index}>
                            {quantity} - {unit} - {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
