import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import { EventHorizontalRightCard } from '@/components/molecules/Card'
import Pagination from '@/components/molecules/Pagination'
import PostHero from '@/components/organisms/PostHero'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import getEventsByTag from '@/functions/fetch/wordpress/getEventsByTag'

export default function BlogPage({ tag, total }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Section>
          <Loading></Loading>
        </Section>
      </Layout>
    )
  }

  const [page, setPage] = useState(1)
  const { data: events } = getEventsByTag(tag.id, page)

  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Event',
      link: '/event',
    },
    {
      text: tag?.name,
    },
  ]

  return (
    <>
      <NextSeo title='All Media' />

      <Layout>
        <PostHero breadcrumbs={breadcrumbs} title={`Event: ${tag?.name}`} />

        <Section className='py-8 md:py-16'>
          <div className=''>
            {events?.slice(10 * (page - 1), 10 * page).map((event, index) => (
              <div key={index} className='py-5 border-b'>
                <EventHorizontalRightCard key={index} eventId={event.id} />
              </div>
            ))}
          </div>

          <div className='my-16'>
            <Pagination
              currentPage={page}
              totalCount={total || 10}
              pageSize={10}
              onPageChange={(page) => setPage(page)}
            />
          </div>

          {tag?.acf?.ad?.link && (
            <Link href={tag.acf.ad.link} urlExternal={true}>
              <Image
                src={tag.acf.ad.image}
                width={parseInt(tag.acf.ad.width)}
                height={parseInt(tag.acf.ad.height)}
              />
            </Link>
          )}
        </Section>

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  /**
   * Category
   */
  const tagRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/event_tags/?slug=${params.slug}`
  )
  const tagData = await tagRes.json()
  const tag = tagData?.length > 0 ? tagData[0] : null

  if (!tag) {
    return {
      notFound: true,
    }
  }

  /**
   * Events
   */
  const eventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc&event_tags=${tag.id}`
  )
  const total = eventsRes.headers.get('X-WP-Total')

  return {
    props: {
      tag,
      total,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/event_tags`
  )
  const categories = await categoriesRes.json()

  return {
    paths: categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: true,
  }
}
