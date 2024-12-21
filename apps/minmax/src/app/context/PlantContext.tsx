import { usePlants } from '@/hooks/usePlants'
import React, { createContext, ReactNode, useState } from 'react'

export type PlantContextType = {
    plants: PlantType[]
    mutate: () => void
    showPlantForm: boolean
    setShowPlantForm: (showPlantForm: boolean) => void
    plant: PlantType | null
    setPlant: (plant: PlantType | null) => void
    plantId: string | null
    setPlantId: (id: string | null) => void
}

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

const PlantContext = createContext<PlantContextType>({
    plants: [],
    mutate: function (): void {
        throw new Error('Function not implemented.')
    },
    showPlantForm: false,
    setShowPlantForm: function (showPlantForm: boolean): void {
        throw new Error('Function not implemented.')
    },
    plant: null,
    setPlant: function (): void {
        throw new Error('Function not implemented.')
    },
    plantId: null,
    setPlantId: function (): void {
        throw new Error('Function not implemented.')
    }
})

const PlantProvider = ({ children }: { children: ReactNode }) => {
    const { data: plants = [], mutate } = usePlants()
    const [showPlantForm, setShowPlantForm] = useState(false)
    const [plant, setPlant] = useState<PlantType | null>(null)
    const [plantId, setPlantId] = useState<string | null>(null)

    return (
        <PlantContext.Provider
            value={{
                plants,
                mutate,
                showPlantForm,
                setShowPlantForm,
                plant,
                setPlant,
                plantId,
                setPlantId,
            }}
        >
            {children}
        </PlantContext.Provider>
    )
}

export { PlantContext, PlantProvider }

