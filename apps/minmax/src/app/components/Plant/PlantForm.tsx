import { FieldGroup } from '@repo/ui/fieldGroup'
import { Header } from '@repo/ui/header'
import { Label } from '@repo/ui/label'
import { useContext, useState, useEffect } from 'react'
import { Field } from '@repo/ui/field'
import { Input } from '@repo/ui/input'
import { Flex } from '@repo/ui/flex'
import { Button } from '@repo/ui/button'
import { Variant } from '@repo/ui/variant'
import { PlantContext } from '@/context/PlantContext'
import { createPlant, CreateOnePlantProps, updatePlant } from '@/hooks/usePlants'

export function PlantForm() {
    const { plant, plantId, setShowPlantForm, mutate } = useContext(PlantContext)
    // const { user_id } = useContext(UserContext) // Get user_id from UserContext
    const [plantFormData, setPlantFormData] = useState({ park_tag_id: '', type: '', longitude: '', latitude: '' })

    useEffect(() => {
        if (plant) {
            setPlantFormData({
                park_tag_id: plant.park_tag_id,
                type: plant.type,
                longitude: plant.longitude,
                latitude: plant.latitude,
            })
        }
    }, [plant])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const parkTagId = data.get('park-tag-id') as string
        const type = data.get('type') as string
        const longitude = data.get('longitude') as string
        const latitude = data.get('latitude') as string

        if (!parkTagId || !type || !longitude || !latitude) {
            return alert('Please fill out all fields')
        }

        const plantData: CreateOnePlantProps = {
            park_tag_id: parkTagId,
            type: type,
            longitude: longitude,
            latitude: latitude,
            // user_id: user_id, // Use user_id from UserContext
        }
        console.log('PLANT DATA', plantData)
        if (plantId) {
            await updatePlant({ plant_id: plantId, params: plantData })
            alert(`Your plant ${parkTagId} has been updated!`)
        } else {
            await createPlant(plantData)
            alert(`Your plant ${parkTagId} has been created!`)
        }
        setPlantFormData({ park_tag_id: '', type: '', longitude: '', latitude: '' })
        setShowPlantForm(false)
        mutate()
    }

    return (
        <>
            <Header variant="h2">Create Plant</Header>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FieldGroup className="flex flex-col gap-4">
                    <Field>
                        <Label htmlFor="park-tag-id">Park Tag ID</Label>
                        <Input
                            id="park-tag-id"
                            name="park-tag-id"
                            placeholder="Enter park tag ID"
                            value={plantFormData.park_tag_id}
                            onChange={(new_park_tag_id) => setPlantFormData({ ...plantFormData, park_tag_id: new_park_tag_id })}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            name="type"
                            placeholder="Enter plant type"
                            value={plantFormData.type}
                            onChange={(new_type) => setPlantFormData({ ...plantFormData, type: new_type })}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                            id="longitude"
                            name="longitude"
                            placeholder="Enter longitude"
                            value={plantFormData.longitude}
                            onChange={(new_longitude) => setPlantFormData({ ...plantFormData, longitude: new_longitude })}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                            id="latitude"
                            name="latitude"
                            placeholder="Enter latitude"
                            value={plantFormData.latitude}
                            onChange={(new_latitude) => setPlantFormData({ ...plantFormData, latitude: new_latitude })}
                        />
                    </Field>
                </FieldGroup>
                <Flex className="justify-end gap-4">
                    <Button variant={Variant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Flex>
            </form>
        </>
    )
}
