'use client'

import { PollOption } from '@/components/poll-option'
import { Poll } from '@/interfaces/poll'
import { PollOption as PollOptionType } from '@/interfaces/poll-option'
import { PollResultSocketMessage } from '@/interfaces/responses/poll-result-socket-message'
import { UserVoteOnPoll } from '@/interfaces/responses/user-vote-on-poll'
import { api } from '@/lib/api'
import { env } from '@/lib/env'
import { useEffect, useState } from 'react'

const BASE_URL = env.NEXT_PUBLIC_WEB_SOCKET_BASE_URL

type PollOptionsProps = {
  poll: Poll
}

export function PollOptions({ poll }: PollOptionsProps) {
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const [options, setOptions] = useState<PollOptionType[]>(poll.options)
  const [userVoteOptionId, setUserVoteOptionId] = useState<string | null>(null)

  useEffect(() => {
    async function initSocketConnection() {
      const webSocket = new WebSocket(`${BASE_URL}/polls/${poll.id}/results`)
      setWebSocket(webSocket)

      webSocket.onopen = () => console.log('Websocket opened!')
      webSocket.onclose = () => console.log(`Websocket closed!`)
    }

    async function getUserVoteOption() {
      const response = await api<UserVoteOnPoll>(`/polls/${poll.id}/vote`)

      if (!response) return

      const { pollOptionId } = response.data

      setUserVoteOptionId(pollOptionId)
    }

    initSocketConnection()
    getUserVoteOption()
  }, [poll])

  if (webSocket) {
    webSocket.onmessage = (message) => {
      const optionUpdate = JSON.parse(message.data) as PollResultSocketMessage

      handleUpdateOption(optionUpdate)
    }
  }

  async function handleUpdateOption(optionUpdate: PollResultSocketMessage) {
    setOptions((prevState) =>
      prevState.map((option) => {
        if (option.id === optionUpdate.pollOptionId) {
          return {
            ...option,
            score: optionUpdate.votes,
          }
        }
        return option
      }),
    )
  }

  return (
    <div>
      {options.map((option) => (
        <PollOption
          key={option.id}
          pollId={poll.id}
          pollOption={option}
          hasVoted={userVoteOptionId ? userVoteOptionId === option.id : false}
          setUserVoteOptionId={setUserVoteOptionId}
        />
      ))}
    </div>
  )
}
