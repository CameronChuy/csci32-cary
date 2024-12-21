// import { RecipeContext } from '@/context/RecipeContext'
import { Flex } from '@repo/ui/flex'
import { useContext } from 'react'
import { PlantContext } from '@/context/PlantContext'
import PlantCard from './PlantCard'

export default function PlantResults() {
    const { plants } = useContext(PlantContext)
    const validPlants = Array.isArray(plants) ? plants : []

    console.log({ plants })

    return (
        <Flex className="gap-4 flex-wrap justify-center">
            {validPlants.length > 0 ? (
                validPlants.map(
                    ({ plant_id, park_tag_id, type, longitude, latitude, uploaded_date, last_modified_date }) => (
                        <PlantCard
                            key={plant_id}
                            type={type}
                            park_tag_id={park_tag_id}
                            plant_id={plant_id}
                            longitude={longitude}
                            latitude={ latitude}
                            uploaded_date={''}
                            last_modified_date={''}
                        />
                    ),
                )
            ) : (
                <div>No recipes available</div>
            )}
        </Flex>
    )
}
