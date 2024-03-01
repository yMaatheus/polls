'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/lib/env'
import { ClipboardIcon, Link1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Loading } from './loading'

const BASE_URL = env.NEXT_PUBLIC_BASE_URL

export default function Page() {
  const searchParams = useSearchParams()

  const pollId = searchParams.get('pollId')

  if (!pollId) return null

  async function handleCopyToClipboard() {
    try {
      const URL = `${BASE_URL}/polls/${pollId}`
      await navigator.clipboard.writeText(URL)

      toast({
        title: 'Área de transferência',
        description: 'Link copiado com sucesso!',
      })
    } catch (error) {
      toast({
        title: 'Área de transferência',
        description: 'Falha ao copiar o link para a área de transferência.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <TooltipProvider>
        <Tooltip>
          <div className="min-w-96 min-h-64 bg-card rounded-lg flex flex-col justify-center items-center space-y-6 p-8">
            <h1 className="font-semibold text-xl items-start">
              Parabéns, Enquete criada com sucesso!
            </h1>
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center">
                Compartilhe o link para que seus amigos possam votar.
              </p>

              <div className="flex gap-4">
                <Button variant="link">
                  <Link href={`/polls/${pollId}`}>Ver Enquete</Link>
                  <Link1Icon className="ml-2 h-4 w-4" />
                </Button>

                <TooltipTrigger asChild>
                  <Button variant="link" onClick={handleCopyToClipboard}>
                    Copiar Link
                    <ClipboardIcon className="ml-2 h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </div>
            </div>
          </div>

          <TooltipContent>
            <p>Click to copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Suspense>
  )
}
