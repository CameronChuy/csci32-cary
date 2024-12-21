import { Button } from '@repo/ui/button'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'
import { useContext } from 'react'
import { PlantContext } from '@/context/PlantContext'
import { deletePlant } from '@/hooks/usePlants'

// props

export type PlantType = {
    plant_id: string
    park_tag_id: string
    type: string
    longitude: string
    latitude: string
    uploaded_date: string
    last_modified_date: string
    //Verification: Type.Array(VerificationType),
}

export default function PlantCard({
    plant_id,
    park_tag_id,
    type,
    longitude,
    latitude,
    uploaded_date,
    last_modified_date,
}: PlantType) {
    const { mutate, setShowPlantForm, setPlantId, setPlant } = useContext(PlantContext)

    return (
        <div className="border-2 border-solid rounded-md border-red-500 bg-red-50 basis-1/4 shadow-md min-w-56 flex-grow p-2">
            <Flex className="justify-between gap-2 bg-red-200 w-full p-4 flex-wrap rounded-md">
                <Header variant="h5" className="justify-between">
                    {park_tag_id}
                </Header>
                <Flex className="gap-2">
                    <Button
                        size={Size.XSMALL}
                        variant={Variant.PRIMARY}
                        onClick={
                            async() => {
                                setPlantId(plant_id)
                                setPlant({
                                    plant_id,
                                    park_tag_id,
                                    type,
                                    longitude,
                                    latitude,
                                    uploaded_date,
                                    last_modified_date,
                                })
                                setShowPlantForm(true)
                            }
                        }
                    >
                        Update
                    </Button>
                    <Button
                        size={Size.XSMALL}
                        variant={Variant.PRIMARY}
                        onClick={async () => {
                            setPlantId(plant_id)
                            console.log('delete plant', {plant_id})
                            await deletePlant(plant_id)
                            mutate()
                            alert(`Plant ${plant_id} deleted`)
                        }}
                    >
                        Delete
                    </Button>
                </Flex>
            </Flex>
            <div className="p-4 bg-red-100 w-full flex flex-col gap-4">
                <p>Type: {type}</p>
                <p>Coordinates: {longitude}, {latitude}</p>
            </div>
        </div>
    )
}
