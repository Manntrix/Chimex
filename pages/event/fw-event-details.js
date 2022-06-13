import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import parse from 'html-react-parser'

export default function FWEvent({ page }) {
  return (
    <>
      <NextSeo
        {...page?.yoast_head_json}
        description={page?.yoast_head_json?.og_description}
      />

      <Layout header='white' pushdown={true}>
        <div style={{ marginTop: '-65px' }}>
          {parse(page?.content?.rendered)}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=fw-event-details`
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
