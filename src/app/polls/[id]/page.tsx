import { PollDetailsResponse } from "@/interfaces/responses/poll-details-response"
import { api } from "@/lib/api"
import { redirect } from "next/navigation"
import { PollOptions } from "./components/poll-options"

type PollDetailsPageParams = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PollDetailsPageParams) {
  const { id } = params

  const response = await api<PollDetailsResponse>(`/polls/${id}`, { cache: "no-cache" });

  const poll = response?.data?.poll;

  if (!response || !poll) return redirect("/")

  return (
    <div>
      <h1>{poll.title}</h1>

      <PollOptions poll={poll} />
    </div>
  )
}
