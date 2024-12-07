import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

async function clearRecipeTable() {
    try {
        await prisma.recipe.deleteMany({})
        console.log('All records in the Recipe table have been deleted.')
    } catch (error) {
        console.error('Error deleting records from the Recipe table:', error)
    } finally {
        await prisma.$disconnect()
    }
}

clearRecipeTable()
