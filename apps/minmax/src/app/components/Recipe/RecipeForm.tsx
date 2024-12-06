import { FieldGroup } from '@repo/ui/fieldGroup'
import { Header } from '@repo/ui/header'
import { Label } from '@repo/ui/label'
import { useState } from 'react'
import { Field } from '@repo/ui/field'
import { Input } from '@repo/ui/input'
import { Flex } from '@repo/ui/flex'
import { Button } from '@repo/ui/button'
import { Variant } from '@repo/ui/variant'

export function RecipeForm() {
    const [recipeFormData, setRecipeFormData] = useState({ name: '', description: '' })
    const [ingredientMeasurements, setIngredientMeasurements] = useState([
        {
            ingredient: {
                name: '',
                description: '',
            },
            unit: '',
            quantity: '',
        },
    ])

    return (
        <>
            <Header variant="h2">Create Recipe</Header>
            <form className="flex flex-col gap-4">
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
                        <FieldGroup className="ml-4 bg-gray-100 shaodw-sm rounded-lg p-4">
                            <Flex>
                                <Label>Ingredient {index + 1}</Label>
                                {setIngredientMeasurements.length > 1 && (
                                    <Button
                                        variant={Variant.SECONDARY}
                                        onClick={() => {
                                            const newIngredientMeasurements = ingredientMeasurements.filter(
                                                (item, idx) => index !== idx,
                                            )
                                            setIngredientMeasurements(newIngredientMeasurements)
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
                                name={`ingredient-name-$(index)`}
                                id={`ingredient-name-$(index)`}
                                onChange={(newIngredientName) => {
                                    const newIngredientMeasurements = [
                                        // take the ingredients before the current index
                                        ...ingredientMeasurements.slice(0, index),
                                        // update the ingredient at the current index
                                        {
                                            ...ingredientMeasurements[index],
                                            ingredient: {
                                                ...ingredientMeasurements[index].ingredient,
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
                                value={ingredient.name}
                                name={`ingredient-quantity-$(index)`}
                                id={`ingredient-quantity-$(index)`}
                                onChange={(newQuantity) => {
                                    const newIngredientMeasurements = [
                                        // take the ingredients before the current index
                                        ...ingredientMeasurements.slice(0, index),
                                        // update the ingredient at the current index
                                        {
                                            ...ingredientMeasurements[index],
                                            quantity: newQuantity,
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
                                value={ingredient.name}
                                name={`ingredient-unit-$(index)`}
                                id={`ingredient-unit-$(index)`}
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
                    <Button variant={Variant.PRIMARY}>Submit</Button>
                </Flex>
            </form>
        </>
    )
}
