'use client'
// import { UserProvider } from '@/context/UserContext'
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
