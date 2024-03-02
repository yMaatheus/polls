'use client'

import { PollOption } from '@/components/poll-option'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Poll } from '@/interfaces/poll'
import { PollOption as PollOptionType } from '@/interfaces/poll-option'
import { PollResultSocketMessage } from '@/interfaces/responses/poll-result-socket-message'
import { UserVoteOnPoll } from '@/interfaces/responses/user-vote-on-poll'
import { api } from '@/lib/api'
import { env } from '@/lib/env'
import { sortOptionsByScore as sort } from '@/utils/sort-options'
import { useEffect, useMemo, useState } from 'react'

const BASE_URL = env.NEXT_PUBLIC_WEB_SOCKET_BASE_URL

type PollOptionsProps = {
  poll: Poll
}

export function PollOptions({ poll }: PollOptionsProps) {
  const [options, setOptions] = useState<PollOptionType[]>(sort(poll.options))
  const [userVoteOptionId, setUserVoteOptionId] = useState<string | null>(null)

  useEffect(() => {
    async function initSocketConnection() {
      const webSocket = new WebSocket(`${BASE_URL}/polls/${poll.id}/results`)

      webSocket.onopen = () => console.log('Websocket opened!')
      webSocket.onclose = () => console.log(`Websocket closed!`)
      webSocket.onmessage = (message) => {
        const optionUpdate = JSON.parse(message.data) as PollResultSocketMessage

        handleUpdateOption(optionUpdate)
      }
    }

    async function getUserVoteOption() {
      try {
        const response = await api<UserVoteOnPoll>(`/polls/${poll.id}/vote`)

        if (!response) return

        const { pollOptionId } = response.data

        setUserVoteOptionId(pollOptionId)
      } catch (error) {}
    }

    initSocketConnection()
    getUserVoteOption()
  }, [poll])

  async function handleUpdateOption(optionUpdate: PollResultSocketMessage) {
    setOptions((prevState) =>
      sort(
        prevState.map((option) => {
          if (option.id === optionUpdate.pollOptionId) {
            return {
              ...option,
              score: optionUpdate.votes,
            }
          }
          return option
        }),
      ),
    )
  }

  const totalVotes = useMemo(
    () => options.reduce((acc, option) => acc + option.score, 0),
    [options],
  )

  return (
    <ScrollArea className="h-96 xl:h-[600px] overflow-auto">
      <div className="flex flex-col space-y-2 mx-3">
        {options.map((option) => (
          <PollOption
            key={option.id}
            pollId={poll.id}
            pollOption={option}
            hasVoted={userVoteOptionId ? userVoteOptionId === option.id : false}
            setUserVoteOptionId={setUserVoteOptionId}
            totalVotes={totalVotes}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
