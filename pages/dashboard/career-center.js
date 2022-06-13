import DashboardLayout from '@/components/common/DashboardLayout'
import Content from '@/components/organisms/Content'

export default function CareerCenter({ page }) {
  return (
    <>
      <DashboardLayout>
        {page?.acf?.elements && <Content elements={page?.acf?.elements} />}
      </DashboardLayout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=career-center`
  )
  const pageData = await pageRes.json()
  const page = pageData?.length > 0 ? pageData[0] : null

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}
