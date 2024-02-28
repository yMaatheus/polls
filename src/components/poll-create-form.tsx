'use client'

import { CreatePollResponse } from '@/interfaces/responses/create-poll-response'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'

export function PollCreateForm() {
  const router = useRouter()
  const [options, setOptions] = useState([''])

  function handleOptionChange(index: number, value: string) {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)

    // Add new input if last input is filled
    if (index === options.length - 1 && value !== '' && options.length < 10) {
      setOptions([...newOptions, ''])
    }
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { title } = Object.fromEntries(formData) as { title: string }
    const optionsNoEmpty = options.filter((option) => option !== '')

    try {
      const response = await api<CreatePollResponse>('/polls', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          options: optionsNoEmpty,
        }),
      })

      const { data } = response

      router.push(`/polls/created?pollId=${data.pollId}`)
    } catch (error) {
      if (!(error instanceof Error)) {
        toast({
          title: 'Enquete',
          description: 'Falha ao tentar criar uma enquete.',
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
    <form
      onSubmit={handleSubmitForm}
      className="w-96 min-h-96 bg-neutral-900 rounded-lg flex flex-col items-center justify-around p-8"
    >
      <h1 className="font-semibold text-2xl">Crie sua enquete</h1>

      <div className="grid gap-4 py-6">
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-left">
            Nome da enquete
          </Label>
          <Input id="title" name="title" />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">Opções</Label>
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <Input
                key={index}
                id={`option-${index}`}
                name={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-2/3 py-6">
        Criar enquete
      </Button>
    </form>
  )
}
