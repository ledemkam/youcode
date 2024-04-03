import { Typography } from "@/components/ui/Typography"
import { Badge } from "@/components/ui/badge"
import { Lesson } from "@prisma/client"

type lessonProps = {
    lesson : Lesson
}
const LessonItem = ({lesson}: lessonProps) => {
  return (
    <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors  hover:bg-accent">
        <Typography variant={"large"}>     
           {lesson.name} 
        </Typography>
        <Badge className="ml-auto">{lesson.state}</Badge>
    </div>
  )
}
export default LessonItem