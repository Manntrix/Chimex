import Divider from '@/components/atoms/Divider'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import getEventTypes from '@/functions/fetch/wordpress/getEventTypes'
import getMedia from '@/functions/fetch/wordpress/getMedia'
import unEntry from '@/functions/unEntry'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Loading from '@/components/atoms/Loading'
import EventHero from '@/components/organisms/EventHero'
import EventDetailFW from '@/components/organisms/EventDetailFW'
import EventDetail from '@/components/organisms/EventDetail'
import PostHero from '@/components/organisms/PostHero'
import getEventTags from '@/functions/fetch/wordpress/getEventTags'

export default function EventPage({ event, moreEvents, sidebar }) {
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

  const { data: types } = getEventTypes(event.id)
  const { data: tags } = getEventTags(event.id)
  const { data: thumbnail } = getMedia(event.featured_media)

  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Media',
      link: '/blog/',
    },
    {
      text: event.title?.rendered,
    },
  ]

  const { elements, information, full_width, top_navs, ad } = event?.acf || {}

  return (
    <>
      <NextSeo
        {...event?.yoast_head_json}
        description={event?.yoast_head_json?.og_description}
      />

      {full_width === true ? (
        <Layout header='white'>
          <EventHero
            background={thumbnail}
            breadcrumbs={breadcrumbs}
            title={unEntry(event.title?.rendered)}
            types={types}
            times={information?.times}
            location={information?.location?.short_address}
          />

          <EventDetailFW
            title={unEntry(event.title?.rendered)}
            information={information}
            top_navs={top_navs}
            elements={elements}
            ad={ad}
            moreEvents={moreEvents}
          />

          <Divider width={12} />
        </Layout>
      ) : (
        <Layout header='black'>
          <PostHero
            breadcrumbs={breadcrumbs}
            title={unEntry(event.title?.rendered)}
            types={types}
            date={event.date}
          />

          <EventDetail
            title={unEntry(event.title?.rendered)}
            thumbnail={thumbnail}
            information={information}
            top_navs={top_navs}
            elements={elements}
            ad={ad}
            moreEvents={moreEvents}
            tags={tags}
            sidebar={sidebar}
          />

          <Divider width={12} />
        </Layout>
      )}
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const slug = 'chime-healthcare-ciso-boot-camp'

  /**
   * Event
   */
  const eventRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?slug=${slug}`
  )
  const eventData = await eventRes.json()
  const event = eventData?.length > 0 ? eventData[0] : null

  if (!event) {
    return {
      notFound: true,
    }
  }

  /**
   * More Events
   */
  const eventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc&per_page=5`
  )
  const eventsData = await eventsRes.json()
  const moreEvents =
    eventsData?.length > 0
      ? eventsData.filter((event) => event.slug !== slug)
      : null

  /**
   * Sidebar
   */
  const sidebarRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/acf/v3/options/options`
  )
  const sidebarData = await sidebarRes.json()
  const { event_sidebar_elements: sidebar } = sidebarData?.acf || {}

  return {
    props: {
      event,
      moreEvents,
      sidebar,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc`
  )
  const posts = await postsRes.json()

  return {
    paths: posts
      .filter((post) => post.parent === 0)
      .map((post) => ({
        params: { slug: [post.slug] },
      })),
    fallback: true,
  }
}
