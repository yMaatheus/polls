'use client'

import { PollOption } from '@/interfaces/poll-option'
import { api } from '@/lib/api'
import { Toggle } from './ui/toggle'

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
    const response = await api(`/polls/${pollId}/votes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ pollOptionId: pollOption.id }),
    })

    if (!response || !response.data) return

    setUserVoteOptionId(pollOption.id)
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
