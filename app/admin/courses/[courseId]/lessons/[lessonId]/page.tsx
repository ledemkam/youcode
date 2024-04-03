import {
    Layout,
    LayoutActions,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { buttonVariants } from '@/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { getRequireAuthSession } from '@/lib/auth';
  import Link from 'next/link';
  import { notFound } from 'next/navigation';
  import { getAdminLesson } from './lesson.query';
import { LessonDetail } from './form/LessonDetailsForm';
import InitializedMDXEditor from './content/InitializedMDXEditor';
  
  export default async function CourseLessonsPage({
    params,
  }: {
    params: {
      lessonId: string;
    };
  }) {
    const session = await getRequireAuthSession();
  
    const lesson = await getAdminLesson(params.lessonId, session.user.id);
  
    if (!lesson) {
      notFound();
    }
  
    return (
      <Layout className="max-w-5xl">
        <LayoutHeader>
          <LayoutTitle>{lesson.name}</LayoutTitle>
        </LayoutHeader>
        <LayoutActions>
          <Link
            className={buttonVariants({
              size: 'sm',
              variant: 'secondary',
            })}
            href={`/admin/courses/${lesson.courseId}/lessons`}
          >
            Back
          </Link>
        </LayoutActions>
        <LayoutContent className="flex flex-col gap-4 lg:flex-row">
          <Card className="w-full flex-1">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <LessonDetail defaultValue={lesson} />
            </CardContent>
          </Card>
          {/* <Card className="max-w-full flex-[3] overflow-auto">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
            </CardContent>
          </Card> */}
        </LayoutContent>
      </Layout>
    );
  }