import { PollDetailsResponse } from '@/interfaces/responses/poll-details-response'
import { api } from '@/lib/api'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PollOptions } from './components/poll-options'

type PollDetailsPageParams = {
  params: {
    id: string
  }
}

async function getPollDetails(id: string) {
  try {
    const response = await api<PollDetailsResponse>(`/polls/${id}`, {
      cache: 'no-cache',
    })

    const { poll } = response.data

    return poll
  } catch (error) {
    return redirect('/')
  }
}

export async function generateMetadata({
  params,
}: PollDetailsPageParams): Promise<Metadata> {
  const poll = await getPollDetails(params.id)

  return {
    title: poll.title,
  }
}

export default async function Page({ params }: PollDetailsPageParams) {
  const { id } = params

  const poll = await getPollDetails(id)

  return (
    <div className="w-[90%] min-h-96 bg-card rounded-xl space-y-12 p-2 md:p-6 md:w-[70%] lg:w-96">
      <h1 className="font-semibold text-xl text-center mt-8">{poll.title}</h1>

      <PollOptions poll={poll} />
    </div>
  )
}
