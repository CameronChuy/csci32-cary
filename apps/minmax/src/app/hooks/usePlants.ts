import useSWR from 'swr'

export interface CreateOnePlantProps {
    park_tag_id: string
    type?: string
    longitude?: string
    latitude?: string
    // user_id: string
}

interface UpdatePlantProps {
    plant_id: string
    params: CreateOnePlantProps
}

type SearchProps = {
    name?: string
    ingredients?: string
}

async function postHelper({ path, body }: { path: string; body: string }) {
    return fetch(`${process.env.NEXT_PUBLIC_PLANTTRACK_API_URL}${path}`, {
        method: 'POST',
        body,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
}

async function putHelper({ path, body }: { path: string; body: string }) {
    return fetch(`${process.env.NEXT_PUBLIC_PLANTTRACK_API_URL}${path}`, {
        method: 'PUT',
        body,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
}

async function deleteHelper({ path }: { path: string }) {
    return fetch(`${process.env.NEXT_PUBLIC_PLANTTRACK_API_URL}${path}`, {
        method: 'PUT',
        body: JSON.stringify({ is_deleted: true }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
}

export function createPlant(params: CreateOnePlantProps) {
    return postHelper({ path: '/plants', body: JSON.stringify(params) })
}

export function updatePlant({ plant_id, params }: UpdatePlantProps) {
    return putHelper({ path: `/plants/${plant_id}`, body: JSON.stringify(params) })
}

export function deletePlant(plant_id: string) {
    return deleteHelper({ path: `/plants/${plant_id}/delete` })
}

async function fetcher({ path, urlParams }: { path: string; urlParams?: string }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PLANTTRACK_API_URL}${path}${urlParams ? `?${urlParams}` : ''}`,
        {
            headers: { 'Access-Control-Allow-Origin': '*' },
        },
    )
    return res.json()
}

export function usePlants(params?: SearchProps) {
    const urlParams = new URLSearchParams(params).toString()
    return useSWR(['/plants', urlParams], ([path, urlParams]) => fetcher({ path, urlParams }))
}

