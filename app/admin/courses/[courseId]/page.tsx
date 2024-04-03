import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from "@/lib/prisma"
import {  getRequireAuthSession } from "@/lib/auth"
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "./admin-course.query";
import CoursesPagination from "../../../../src/features/pagination/CoursesPagination";
import { buttonVariants } from "@/components/ui/button";

export default async function CoursePage({
  params,
  searchParams
}: {
  params: {
    courseId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

    const page = Number(searchParams.page ?? 1)

    const session = await getRequireAuthSession()
    
    const course = await getCourse({
     courseId : params.courseId,
     userId : session.user.id,
     userPage : page
    })

    //console.log({course});
    
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          Courses
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
          <Card  className="flex-[2]">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage src={user.image} alt={user.email ?? ""} />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CoursesPagination baseUrl={`/admin/courses/${course.id}`} page={page} totalPages={course._count?.users ?? 0 / 5}/>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course.name?.[0]}</AvatarFallback>
              {course.image && (
                <AvatarImage src={course.image} alt={course.name ?? ''} />
              )}
            </Avatar>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link href={`/admin/courses/${course.id}/edit`} className={buttonVariants({
              variant: "outline"
            })}>
              Edit
            </Link>
            <Link href={`/admin/courses/${course.id}/lessons`} className={buttonVariants({
              variant: "outline"
            })}>
              Edit lessons
            </Link>
          </CardContent>
        </Card>
         
      </LayoutContent>
    </Layout>
  )
}