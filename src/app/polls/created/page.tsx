'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()

  const pollId = searchParams.get('pollId')

  if (!pollId) return null

  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <div className="w-96 min-h-96 bg-neutral-900 rounded-lg flex flex-col items-center justify-around p-8">
        <h1 className="font-semibold text-2xl">Parabéns!</h1>
        <h1 className="font-semibold text-2xl">Você criou uma enquete!</h1>
        <p className="text-center">
          Compartilhe o link para que seus amigos possam votar.
        </p>
        <Link
          href={`/polls/${pollId}`}
          className="text-primary-500 hover:underline"
        >
          {`/polls/${pollId}`}
        </Link>
      </div>
    </div>
  )
}
