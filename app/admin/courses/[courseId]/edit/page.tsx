/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/form/SubmitButton';
  import { getRequireAuthSession } from '@/lib/auth';
  import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
  import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

  const FormSchema = z.object({
    name: z.string().min(3).max(40),
    image: z.string().url(),
    presentation: z.string()
  });
  
  export default async function CoursePage({
    params,
  }: {
    params: {
      courseId: string;
    };
  }) {
    const session = await getRequireAuthSession();
  
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        creatorId: session.user.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        presentation: true,
        state: true,
      },
    });
  
    if (!course) {
      notFound();
    }
  
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Edit course</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card className="flex-[2]">
            <CardContent className="mt-6">
            <form action={ async(formData) => {
                "use server"

                const userSession = await getRequireAuthSession();
                const image =  formData.get("image");
                const name = formData.get("name")
                const presentation = formData.get("presentation");

                const safeData = FormSchema.safeParse({
                    image,
                    name,
                    presentation
                  });
                  if (!safeData.success) {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      'error',
                      'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
                    );
                    redirect(`/admin/courses/${course.id}/edit?${searchParams.toString()}`);
                  }
                await prisma.course.update({
                  where:{
                    id: course.id,
                    creatorId: userSession.user.id

                  },
                  data: safeData.data
                })
                revalidatePath(`/admin/courses/${course.id}`);
                redirect(`/admin/courses/${course.id}`);
              }}
               
              className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                    <Label htmlFor="image">Image URL</Label>
                    <Input name="image" id="image" defaultValue={course.image}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="name" id="image">Name</Label>
                    <Input name="name" id="name" defaultValue={course.name}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="name" id="image">Presentations</Label>
                    <Textarea defaultValue={course.presentation} name='presentation' id='presentation'/>
                </div>
                <SubmitButton>Submit</SubmitButton>
            </form>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }