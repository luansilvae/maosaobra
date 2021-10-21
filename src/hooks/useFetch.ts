import useSWR from 'swr'

interface Favorites {
  professionalId?: string
  professionalName?: string
  professionalImage?: string
}
interface User {
  _id: string
  name: string
  email: string
  image: string
  phone: string
  cnpj: string
  description: string
  especialidades: string[]
  favorites: Favorites[]
  experience: number
  professional: boolean
  address: {
    state: string
    neighborhood: string
    city: string
    cep: string
  }
}

export function useFetch(url: string) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await fetch(url)
    const data: User = await response.json()

    return data
  })

  return { data, error, mutate }
}
