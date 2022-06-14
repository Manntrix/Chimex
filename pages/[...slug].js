import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import PageHero from '@/components/organisms/PageHero'
import unEntry from '@/functions/unEntry'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Content from '@/components/organisms/Content'
import parse from 'html-react-parser'

export default function Page({ page, parentPage, vc }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Section>
          <Loading />
        </Section>
      </Layout>
    )
  }

  const breadcrumbs = parentPage
    ? [
        {
          text: 'Home',
          link: '/',
        },
        {
          text: unEntry(parentPage?.title?.rendered),
          link: parentPage?.title?.slug,
        },
        {
          text: unEntry(page?.title?.rendered),
        },
      ]
    : [
        {
          text: 'Home',
          link: '/',
        },
        {
          text: unEntry(page?.title?.rendered),
        },
      ]

  return (
    <>
      <NextSeo
        {...page?.yoast_head_json}
        description={page?.yoast_head_json?.og_description}
      />

      <Layout>
        {vc ? (
          parse(page?.content?.rendered)
        ) : (
          <>
            <PageHero
              breadcrumbs={breadcrumbs}
              title={page?.title?.rendered}
              background_image={page?.acf?.hero_image}
            />
            <Section className='py-12'>
              {page?.acf?.elements && (
                <Content elements={page?.acf?.elements} />
              )}
            </Section>
          </>
        )}

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug[params.slug.length - 1]
  // const slug = 'membership'

  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=${slug}`
  )
  const pageData = await pageRes.json()
  const page = pageData?.length > 0 ? pageData[0] : null

  console.log()

  const vc = page?.acf?.enable_visual_composer
    ? page.acf.enable_visual_composer
    : false

  //console.log(vc)

  if (!page) {
    return {
      notFound: true,
    }
  }

  /**
   * Parent Page
   */
  let parentPage = null
  if (page.parent > 0) {
    const parentPageRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/${page.parent}`
    )

    parentPage = await parentPageRes.json()
  }

  return {
    props: {
      page,
      vc,
      parentPage,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const pagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/`
  )
  const pages = await pagesRes.json()

  return {
    paths: pages
      .filter(
        (page) =>
          page.parent === 0 && page.slug !== '/' && page.slug !== 'event'
      )
      .map((page) => ({
        params: { slug: [page.slug] },
      })),
    fallback: true,
  }
}
