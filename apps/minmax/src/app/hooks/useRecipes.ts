export interface CreateRecipeProps {
    name: string
    description: string
    measurements: {
        ingredient_name: string
        unit: string
        quantity: number
    }[]
    user_id: string // Add user_id property
}

async function postHelper({ path, body }: { path: string; body: string }) {
    return fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}${path}`, {
        method: 'POST',
        body,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
}

export function createRecipe(params: CreateRecipeProps) {
    return postHelper({ path: '/recipes', body: JSON.stringify(params) })
}
