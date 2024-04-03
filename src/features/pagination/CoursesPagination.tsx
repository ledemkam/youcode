"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

type CoursesPaginationProps = {
    totalPages: number,
    page: number,
    baseUrl: string
}
 const CoursesPagination = (props: CoursesPaginationProps) => {
    const router = useRouter()
  return (
    <div className="flex gap-2">
        <Button 
        variant="outline"
        size="sm"
        disabled={props.page === 0}
        onClick={() => {
            const searchParams = new URLSearchParams({
                page: String(props.page - 1),
            })
            const url = `${props.baseUrl}?${searchParams.toString()}`
            router.push(url)
        }}>
             Previous
        </Button>
        <Button 
         variant="outline"
         size="sm"
         disabled={props.page === props.totalPages}
         onClick={() => {
            const searchParams = new URLSearchParams({
                page: String(props.page + 1),
            })
            const url = `${props.baseUrl}?${searchParams.toString()}`
            router.push(url)
        }}>
             Next
        </Button>
    </div>
  )
}

export default CoursesPagination