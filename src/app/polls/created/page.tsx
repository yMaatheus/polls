import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { Suspense } from 'react'
import { PollCreatedViewOrShare } from './components/poll-created-view-or-share'
import Loading from './loading'

export default function Page() {
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

              <PollCreatedViewOrShare />
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
