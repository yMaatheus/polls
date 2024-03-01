import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Skeleton className="w-[480px] h-[256px] rounded-lg flex flex-col justify-center items-center space-y-6 p-8">
      <Skeleton className="h-[28px] w-[386px]" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-[24px] w-[416px]" />

        <div className="flex gap-4">
          <Skeleton className="h-[36px] w-[138px]" />
          <Skeleton className="h-[36px] w-[132px]" />
        </div>
      </div>
    </Skeleton>
  )
}
