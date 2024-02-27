import { env } from './env'

export async function api<T>(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  const response = await fetch(url, { credentials: 'include', ...init })

  if (!response.ok) {
    console.error(response.statusText)
    return
  }

  const data = (await response.json()) as T

  return {
    ...response,
    data,
  }
}
