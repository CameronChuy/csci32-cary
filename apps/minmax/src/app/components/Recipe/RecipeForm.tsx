import { FieldGroup } from '@repo/ui/fieldGroup'
import { Header } from '@repo/ui/header'
import { Label } from '@repo/ui/label'
import { useContext, useState } from 'react'
import { Field } from '@repo/ui/field'
import { Input } from '@repo/ui/input'
import { Flex } from '@repo/ui/flex'
import { Button } from '@repo/ui/button'
import { Variant } from '@repo/ui/variant'
import { RecipeContext } from '@/context/RecipeContext'
import { UserContext } from '@/context/UserContext'
import { createRecipe, CreateRecipeProps, updateRecipe } from '@/hooks/useRecipes'

export function RecipeForm() {
    const { recipe, recipeId, setShowRecipeForm, mutate } = useContext(RecipeContext)
    const { user_id } = useContext(UserContext) // Get user_id from UserContext
    const [recipeFormData, setRecipeFormData] = useState({ name: '', description: '' })
    const [ingredientMeasurements, setIngredientMeasurements] = useState(
        recipe?.ingredient_measurement || [
            {
                ingredient: {
                    name: '',
                    description: '',
                },
                unit: '',
                quantity: '',
            },
        ],
    )

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const recipeName = data.get('recipe-name') as string
        const recipeDescription = data.get('recipe-description') as string
        const ingredient_measurement = []
        for (const key of data.keys()) {
            if (key.includes('ingredient-name')) {
                const ingredient_name = data.get(key) as string
                const unit = data.get(key.replace('ingredient-name-', 'ingredient-unit-')) as string
                const quantity = Number(data.get(key.replace('ingredient-name-', 'ingredient-quantity-')))
                if (!ingredient_name || !unit || !quantity) {
                    continue
                }
                ingredient_measurement.push({
                    ingredient_id: recipe?.ingredient_measurement.find(
                        (ingredient) => ingredient.ingredient.name === ingredient_name,
                    )?.ingredient.ingredient_id,
                    ingredient_name,
                    unit,
                    quantity,
                })
            }
        }
        if (typeof recipeName !== 'string' || typeof recipeDescription !== 'string') {
            return alert('Please fill out all fields')
        }
        if (ingredient_measurement.length === 0) {
            return alert('Please add at least one ingredient')
        }
        const recipeData: CreateRecipeProps = {
            name: recipeName,
            description: recipeDescription,
            ingredient_measurement: ingredient_measurement,
            user_id: user_id, // Use user_id from UserContext
        }
        console.log('RECIPE DATA', recipeData)
        if (recipeId) {
            await updateRecipe({ recipe_id: recipeId, params: recipeData })
            alert(`Your recipe ${recipeName} has been updated!`)
        } else {
            await createRecipe(recipeData)
            alert(`Your recipe ${recipeName} has been created!`)
        }
        setRecipeFormData({ name: '', description: '' })
        setShowRecipeForm(false)
        mutate()
    }

    return (
        <>
            <Header variant="h2">Create Recipe</Header>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FieldGroup className="flex flex-col gap-4">
                    <Field>
                        <Label htmlFor="recipe-name">Recipe Name</Label>
                        <Input
                            id="recipe-name"
                            name="recipe-name"
                            placeholder="Enter recipe name"
                            value={recipeFormData.name}
                            onChange={(newName) => setRecipeFormData({ ...recipeFormData, name: newName })}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="recipe-description">Recipe description</Label>
                        <Input
                            id="recipe-description"
                            name="recipe-description"
                            placeholder="Enter recipe description"
                            value={recipeFormData.description}
                            onChange={(newDescription) =>
                                setRecipeFormData({ ...recipeFormData, description: newDescription })
                            }
                        />
                    </Field>
                </FieldGroup>
                {ingredientMeasurements.map(({ unit, quantity, ingredient }, index) => {
                    return (
                        <FieldGroup className="ml-4 bg-gray-100 shadow-sm rounded-lg p-4" key={index}>
                            <Flex>
                                <Label>Ingredient {index + 1}</Label>
                                {ingredientMeasurements.length > 1 && (
                                    <Button
                                        variant={Variant.SECONDARY}
                                        onClick={() => {
                                            const newIngredientMeasurements = ingredientMeasurements.filter(
                                                (item, idx) => index !== idx,
                                            )
                                            setIngredientMeasurements(
                                                newIngredientMeasurements.map((measurement) => ({
                                                    ...measurement,
                                                    ingredient: {
                                                        ...measurement.ingredient,
                                                        description: measurement.ingredient.description || '',
                                                    },
                                                })),
                                            )
                                        }}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Flex>
                            <Input
                                placeholder="Enter ingredient name"
                                variant={Variant.SECONDARY}
                                value={ingredient.name}
                                name={`ingredient-name-${index}`}
                                id={`ingredient-name-${index}`}
                                onChange={(newIngredientName) => {
                                    const newIngredientMeasurements = [
                                        // take the ingredients before the current index
                                        ...ingredientMeasurements.slice(0, index),
                                        // update the ingredient at the current index
                                        {
                                            ...ingredientMeasurements[index],
                                            ingredient: {
                                                ...ingredientMeasurements[index]?.ingredient,
                                                name: newIngredientName,
                                            },
                                        },
                                        // take the ingredients after the current index
                                        ...ingredientMeasurements.slice(index + 1),
                                    ]
                                    setIngredientMeasurements(newIngredientMeasurements)
                                }}
                            />
                            <Input
                                placeholder="Enter ingredient quantity"
                                variant={Variant.SECONDARY}
                                value={quantity}
                                name={`ingredient-quantity-${index}`}
                                id={`ingredient-quantity-${index}`}
                                onChange={(newQuantity) => {
                                    const newIngredientMeasurements = [
                                        // take the ingredients before the current index
                                        ...ingredientMeasurements.slice(0, index),
                                        // update the ingredient at the current index
                                        {
                                            ...ingredientMeasurements[index],
                                            quantity: Number(newQuantity), // Ensure quantity is a number
                                        },
                                        // take the ingredients after the current index
                                        ...ingredientMeasurements.slice(index + 1),
                                    ]
                                    setIngredientMeasurements(newIngredientMeasurements)
                                }}
                            />
                            <Input
                                placeholder="Enter ingredient unit"
                                variant={Variant.SECONDARY}
                                value={unit}
                                name={`ingredient-unit-${index}`}
                                id={`ingredient-unit-${index}`}
                                onChange={(newUnit) => {
                                    const newIngredientMeasurements = [
                                        // take the ingredients before the current index
                                        ...ingredientMeasurements.slice(0, index),
                                        // update the ingredient at the current index
                                        {
                                            ...ingredientMeasurements[index],
                                            unit: newUnit,
                                        },
                                        // take the ingredients after the current index
                                        ...ingredientMeasurements.slice(index + 1),
                                    ]
                                    setIngredientMeasurements(newIngredientMeasurements)
                                }}
                            />
                        </FieldGroup>
                    )
                })}
                <Flex className="justify-end gap-4">
                    <Button
                        onClick={() => {
                            setIngredientMeasurements([
                                ...ingredientMeasurements,
                                {
                                    ingredient: {
                                        name: '',
                                        description: '',
                                    },
                                    unit: '',
                                    quantity: '',
                                },
                            ])
                        }}
                    >
                        Add another ingredient
                    </Button>
                    <Button variant={Variant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Flex>
            </form>
        </>
    )
}
