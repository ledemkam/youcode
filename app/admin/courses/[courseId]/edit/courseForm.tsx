'use client';

import { CourseFormSchema } from "./course.schema"
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { courseActionCreate, courseActionEdit } from "./course.action";
import { toast } from "sonner";

export type CourseFormProps = {
    defaultValue?: CourseFormSchema & {
        id: string
    }
}

export default function CourseForm({defaultValue}: CourseFormProps) {
    const form = useZodForm({
        schema: CourseFormSchema,
        defaultValues: defaultValue,
      });
      const router = useRouter();

  return (
    <Form
    form={form}
    className="flex flex-col gap-4"
    onSubmit={async(values) => {
        console.log(values);
        const { data, serverError } = defaultValue?.id
          ? await courseActionEdit({
              courseId: defaultValue.id,
              data: values,
            })
          : await courseActionCreate(values);

          if (data) {
            toast.success(data.message);
            router.push(`/admin/courses/${data.course.id}`);
            router.refresh();
            return;
          }
  
          toast.error('Some error occurred', {
            description: serverError,
          });
          return;
        }}>
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input placeholder="https://googleimage.com" {...field} />
          </FormControl>
          <FormDescription>
            Host and use an image. You can use{' '}
            <Link href="https://imgur.com">Imgur</Link> to host your image.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="NextReact" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="presentation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Presentation</FormLabel>
          <FormControl>
            <Textarea placeholder="## Some title" {...field} />
          </FormControl>
          <FormDescription>Markdown is supported.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </Form>
  )
}