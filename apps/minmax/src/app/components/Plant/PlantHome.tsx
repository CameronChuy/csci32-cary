// import { RecipeForm } from './RecipeForm'
// import { RecipeContext } from '@/context/RecipeContext'
import { Wrapper } from '@repo/ui/wrapper'
import { Flex } from '@repo/ui/flex'
import { useContext } from 'react'
import { Button } from '@repo/ui/button'
import { Variant } from '@repo/ui/variant'
import { Header } from '@repo/ui/header'
import React from 'react'
import PlantResults from './PlantResults'
import { PlantContext } from '@/context/PlantContext'
import { PlantForm } from './PlantForm'
// import RecipeSearch from './RecipeSearch'
// import RecipeResults from './RecipeResults'

export default function PlantHome() {
    // const
    // return (
    //     <Wrapper
    //     PlantResults
    //     </Wrapper>
    // )
const { showPlantForm, setShowPlantForm } = useContext(PlantContext)
  return (
    <Wrapper>
      <Flex className=" items-center w-full justify-between">
        <Header variant="h1">Welcome to Plant Tracker</Header>
        <Button
          variant={Variant.TERTIARY}
          onClick={() => {
            setShowPlantForm(!showPlantForm)
          }}
        >
          {showPlantForm ? 'Search Plants' : 'Create Plant'}
        </Button>
      </Flex>

      <Flex className="flex-col gap-y-8 mt-8">
        {showPlantForm ? (
          <PlantForm />
        ) : (
            <>
            <PlantResults />
          </>
        )}
      </Flex>
    </Wrapper>
  )
}
