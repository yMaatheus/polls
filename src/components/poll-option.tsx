'use client'

import { Progress } from '@/components/ui/progress'
import { PollOption } from '@/interfaces/poll-option'
import { api } from '@/lib/api'
import { useMemo } from 'react'
import { Toggle } from './ui/toggle'
import { toast } from './ui/use-toast'

type PollOptionProps = {
  pollId: string
  pollOption: PollOption
  hasVoted: boolean
  setUserVoteOptionId: (pollOptionId: string) => void
  totalVotes: number
}

export function PollOption({
  pollId,
  pollOption,
  hasVoted,
  setUserVoteOptionId,
  totalVotes,
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

  const percentage =
    useMemo(
      () => (100 * pollOption.score) / totalVotes,
      [pollOption, totalVotes],
    ) || 0

  return (
    <Toggle
      pressed={hasVoted}
      onPressedChange={handleVote}
      variant="outline"
      className="py-6"
      size="xl"
    >
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <span>{pollOption.title}</span>

          <span>
            {percentage.toFixed(2)}% ({pollOption.score})
          </span>
        </div>
        <Progress value={percentage} />
      </div>
    </Toggle>
  )
}
