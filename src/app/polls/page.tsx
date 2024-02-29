import { PollCreateForm } from '@/components/poll-create-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar',
}

export default function Page() {
  return <PollCreateForm />
}
