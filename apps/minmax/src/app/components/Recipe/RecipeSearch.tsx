import { Field } from '@repo/ui/field'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { IngredientList } from './IngredientList'
import { RecipeContext } from '@/context/RecipeContext'
import { useContext } from 'react'

export default function RecipeSearch() {
    const { setIngredientQuery, ingredientQuery, setIngredients, setRecipeNameQuery, ingredients } =
        useContext(RecipeContext)
        // console.log( 'ingredientQuery', ingredientQuery, 'setIngredients', 'setRecipeNameQuery', 'ingredients', ingredients)
    return (
        <>
            <Header variant='h1' className="justify-between">Search Recipes</Header>
            <Flex className='flex-col gap-y-4'>
                <Field>
                    <Label>Ingredients</Label>
                    <Input
                        name="ingredient-search"
                        id="ingredient-search"
                        onChange={(newIngredientsQuery) => setIngredientQuery(newIngredientsQuery)}
                        onEnter={() => {
                            setIngredients([...ingredients, ingredientQuery])
                            setIngredientQuery('')
                        }}
                    />
                </Field>
                <IngredientList />
                <Field>
                    <Label>Recipe name</Label>
                    <Input
                    name='recipe-name-search'
                    id='recipe-name-search'
                    onEnter={(recipeNameSearch) => setRecipeNameQuery(recipeNameSearch)} />
                </Field>
            </Flex>
        </>
    )
}
