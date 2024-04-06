import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default async function CoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href={"/admin/courses"} className={buttonVariants()}>
          Courses
        </Link>
      </LayoutContent>
    </Layout>
  );
}
