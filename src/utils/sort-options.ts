import { PollOption } from '@/interfaces/poll-option'

export function sortOptionsByScore(options: PollOption[]) {
  options.sort((a, b) => b.score - a.score)
  return options
}
