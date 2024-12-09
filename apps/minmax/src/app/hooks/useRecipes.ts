import useSWR from 'swr'

export interface CreateRecipeProps {
    name: string
    description: string
    ingredient_measurement: {
        ingredient_name: string
        unit: string
        quantity: number
    }[]
    user_id: string // Add user_id property
}

type SearchProps = {
    name?: string
    ingredients?: string
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

async function fetcher({ path, urlParams }: { path: string; urlParams?: string }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}${path}${urlParams ? `?${urlParams}` : ''}`,
        {
            headers: { 'Access-Control-Allow-Origin': '*' },
        },
    )
    return res.json()
}

export function useRecipes(params?: SearchProps) {
    const urlParams = new URLSearchParams(params).toString()
    return useSWR(['/recipes', urlParams], ([path, urlParams]) => fetcher({ path, urlParams }))
}
