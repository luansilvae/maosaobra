import useSWR from 'swr'

interface User {
  _id: string
  name: string
  email: string
  image: string
  city: string
  neighborhood: string
  phone: string
  state: string
  cnpj: string
  description: string
  especialidades: string[]
  experience: number
  professional: boolean
}

export function useFetch(url: string) {
  const { data, error } = useSWR(
    url,
    async url => {
      const response = await fetch(url)
      const data: User = await response.json()

      return data
    },
    { refreshInterval: 2000 }
  )

  return { data, error }
}
