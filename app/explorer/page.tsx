import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout"
import Link from "next/link"


export default async function ExplorerPage() {
  return (
    <Layout>
    <LayoutHeader>
      <LayoutTitle>
        Explorer
      </LayoutTitle>
    </LayoutHeader>
    <LayoutContent>
    <Link href={'/admin/courses'}>Courses</Link>
    </LayoutContent>
  </Layout>
  )
}