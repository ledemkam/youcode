/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { Card, CardContent } from '@/components/ui/card';
  import { getRequireAuthSession } from '@/lib/auth';
import CourseForm from '../[courseId]/edit/courseForm';
  
  export default async function CoursePage() {
    await getRequireAuthSession();
  
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Create course</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card className="flex-[2]">
            <CardContent className="mt-6">
              <CourseForm/>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }