'use client'
import { UserProvider } from '@/context/UserContext'
import { RecipeProvider } from '@/context/RecipeContext'
import RecipeHome from '@/components/Recipe/RecipeHome'

export default function Home() {
  return (
    <UserProvider>
      <RecipeProvider>
        <RecipeHome />
      </RecipeProvider>
    </UserProvider>
  )
}
