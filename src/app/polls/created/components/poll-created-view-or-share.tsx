'use client'

import { Button } from '@/components/ui/button'
import { TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/lib/env'
import { ClipboardIcon, Link1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const BASE_URL = env.NEXT_PUBLIC_BASE_URL

export function PollCreatedViewOrShare() {
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
  )
}
