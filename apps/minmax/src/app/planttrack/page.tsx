'use client'
import { UserProvider } from '@/context/UserContext'
import { RecipeProvider } from '@/context/RecipeContext'
import RecipeHome from '@/components/Recipe/RecipeHome'
import PlantHome from '@/components/Plant/PlantHome'
import { PlantProvider } from '@/context/PlantContext'

export default function Home() {
    return (
        // <UserProvider>
        <PlantProvider>
            <PlantHome />
        </PlantProvider>
        // </UserProvider>
    )
}
