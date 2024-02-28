'use client'

import { PollOption } from '@/interfaces/poll-option'
import { api } from '@/lib/api'
import { Toggle } from './ui/toggle'
import { toast } from './ui/use-toast'

type PollOptionProps = {
  pollId: string
  pollOption: PollOption
  hasVoted: boolean
  setUserVoteOptionId: (pollOptionId: string) => void
}

export function PollOption({
  pollId,
  pollOption,
  hasVoted,
  setUserVoteOptionId,
}: PollOptionProps) {
  async function handleVote() {
    try {
      await api(`/polls/${pollId}/votes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ pollOptionId: pollOption.id }),
      })

      setUserVoteOptionId(pollOption.id)
    } catch (error: Error | unknown) {
      if (!(error instanceof Error)) {
        toast({
          title: 'Enquete',
          description: 'Falha ao tentar efetuar uma votação na enquete.',
          variant: 'destructive',
        })
        return
      }
      toast({
        title: 'Enquete',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Toggle
      aria-label="Toggle italic"
      pressed={hasVoted}
      onPressedChange={handleVote}
    >
      {pollOption.title} - {pollOption.score}
    </Toggle>
  )
}
