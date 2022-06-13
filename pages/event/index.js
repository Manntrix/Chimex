import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import { EventHighlightCard } from '@/components/molecules/Card'
import Content from '@/components/organisms/Content'
import PostHero from '@/components/organisms/PostHero'
import unEntry from '@/functions/unEntry'
import { Popover, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

export default function BlogPage({
  page,
  featuredEvents,
  latestEvents,
  specialEvents,
  pastEvents,
  tags,
  topics,
  types,
}) {
  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Events',
    },
  ]

  const [sort, setSort] = useState('Date')
  const [typeFilter, setTypeFilter] = useState('All')

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState(1)

  return (
    <>
      <NextSeo title='All Events' />

      <Layout>
        <PostHero breadcrumbs={breadcrumbs} title='All Events' />

        <Section className='pt-20'>
          <div className='border border-gray-300 mb-4 px-3 py-2 flex flex-col lg:flex-row justify-between'>
            <div className='flex'>
              <Image src='/icons/search-black.svg' width={16} height={16} />
              <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='border-0 focus:ring-0 focus:outline-none'
                placeholder='Search for events'
              />
            </div>

            <div className='flex'>
              <Image src='/icons/location-black.svg' width={18} height={18} />
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='border-0 focus:ring-0 focus:outline-none'
                placeholder='In a location'
              />
            </div>

            <div className='flex'>
              <Link
                href={`/search?type=chime_event&q=${keyword}&location=${location}&month=${month}`}
                className='border border-gray-600 px-3 py-2 font-bold'
              >
                Find Events
              </Link>

              <div className='border-l pl-4 ml-5'>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className='border-0 font-bold focus:ring-0 focus:outline-none'
                >
                  <option value={1}>Jan</option>
                  <option value={2}>Feb</option>
                  <option value={3}>Mar</option>
                  <option value={4}>Apr</option>
                  <option value={5}>May</option>
                  <option value={6}>Jun</option>
                  <option value={7}>Jul</option>
                  <option value={8}>Aug</option>
                  <option value={9}>Sep</option>
                  <option value={10}>Oct</option>
                  <option value={11}>Nov</option>
                  <option value={12}>Dec</option>
                </select>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between'>
            <Popover.Group className='flex flex-row gap-8'>
              <Popover className='relative'>
                <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                  Event Type <ChevronDownIcon width={16} height={16} />
                </Popover.Button>

                <Transition>
                  <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                    {types?.length > 0 &&
                      types?.map((type, index) => (
                        <a
                          key={index}
                          href={`/event/chime_event_type/${type.slug}`}
                          className='block mb-1.5 hover:underline'
                        >
                          {unEntry(type.name)}
                        </a>
                      ))}
                  </Popover.Panel>
                </Transition>
              </Popover>

              <Popover className='relative'>
                <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                  Event Topic <ChevronDownIcon width={16} height={16} />
                </Popover.Button>

                <Transition>
                  <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                    {topics?.length > 0 &&
                      topics?.map((topic, index) => (
                        <a
                          key={index}
                          href={`/blog/event_categories/${topic.slug}`}
                          className='block mb-1.5 hover:underline'
                        >
                          {unEntry(topic.name)}
                        </a>
                      ))}
                  </Popover.Panel>
                </Transition>
              </Popover>

              <Popover className='relative'>
                <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                  Event Tag <ChevronDownIcon width={16} height={16} />
                </Popover.Button>

                <Transition>
                  <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                    {tags?.length > 0 &&
                      tags?.map((tag, index) => (
                        <a
                          key={index}
                          href={`/event/event_tags/${tag.slug}`}
                          className='block mb-1.5 hover:underline'
                        >
                          {unEntry(tag.name)}
                        </a>
                      ))}
                  </Popover.Panel>
                </Transition>
              </Popover>

              <Popover className='relative'>
                <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                  Sort by {sort} <ChevronDownIcon width={16} height={16} />
                </Popover.Button>

                <Transition>
                  <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                    <span
                      className='block mb-1.5 hover:underline cursor-pointer'
                      onClick={() => setSort('Date')}
                    >
                      Date
                    </span>
                    <span
                      className='block mb-1.5 hover:underline cursor-pointer'
                      onClick={() => setSort('Name')}
                    >
                      Name
                    </span>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <div className='flex gap-3'>
              <div
                className={classNames(
                  'px-3 py-0.5 border border-gray-300 flex items-center gap-1 cursor-pointer',
                  typeFilter === 'All' && 'bg-blue-sky text-white'
                )}
                onClick={() => setTypeFilter('All')}
              >
                {typeFilter === 'All' && <CheckIcon width={16} height={16} />}
                All
              </div>

              <div
                className={classNames(
                  'px-3 py-0.5 border border-gray-300 flex items-center gap-1 cursor-pointer',
                  typeFilter === 'Past' && 'bg-blue-sky text-white'
                )}
                onClick={() => setTypeFilter('Past')}
              >
                {typeFilter === 'Past' && <CheckIcon width={16} height={16} />}
                Past
              </div>

              <div
                className={classNames(
                  'px-3 py-0.5 border border-gray-300 flex items-center gap-1 cursor-pointer',
                  typeFilter === 'Upcoming' && 'bg-blue-sky text-white'
                )}
                onClick={() => setTypeFilter('Upcoming')}
              >
                {typeFilter === 'Upcoming' && (
                  <CheckIcon width={16} height={16} />
                )}
                Upcoming
              </div>

              <div
                className={classNames(
                  'px-3 py-0.5 border border-gray-300 flex items-center gap-1 cursor-pointer',
                  typeFilter === 'In Person' && 'bg-blue-sky text-white'
                )}
                onClick={() => setTypeFilter('In Person')}
              >
                {typeFilter === 'In Person' && (
                  <CheckIcon width={16} height={16} />
                )}
                In Person
              </div>

              <div
                className={classNames(
                  'px-3 py-0.5 border border-gray-300 flex items-center gap-1 cursor-pointer',
                  typeFilter === 'Online' && 'bg-blue-sky text-white'
                )}
                onClick={() => setTypeFilter('Online')}
              >
                {typeFilter === 'Online' && (
                  <CheckIcon width={16} height={16} />
                )}
                Online
              </div>
            </div>
          </div>
        </Section>

        <Section className='py-8 md:py-16'>
          {typeFilter === 'All' && (
            <>
              <div className='flex flex-row justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-500 tracking-widest uppercase'>
                  Featured EVENTS
                </h3>

                <Link
                  href='/event/tag/featured-event'
                  className='underline font-bold'
                >
                  {'View all >'}
                </Link>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {featuredEvents?.map((event, index) => (
                  <EventHighlightCard key={index} eventId={event.id} />
                ))}
              </div>

              <hr className='my-12' />
            </>
          )}

          {(typeFilter === 'All' || typeFilter === 'Upcoming') && (
            <>
              <div className='flex flex-row justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-500 tracking-widest uppercase mb-3'>
                  LATEST EVENTS
                </h3>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {latestEvents?.map((event, index) => (
                  <EventHighlightCard key={index} eventId={event.id} />
                ))}
              </div>

              <hr className='my-12' />
            </>
          )}

          {typeFilter === 'All' && (
            <>
              <div className='flex flex-row justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-500 tracking-widest uppercase mb-3'>
                  SPECIAL EVENTS
                </h3>

                <Link
                  href='/event/tag/special-event'
                  className='underline font-bold'
                >
                  {'View all >'}
                </Link>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {specialEvents?.map((event, index) => (
                  <EventHighlightCard key={index} eventId={event.id} />
                ))}
              </div>

              <hr className='my-12' />
            </>
          )}

          {typeFilter === 'All' && (
            <>
              {page?.acf?.elements && (
                <Content elements={page?.acf?.elements} />
              )}

              <hr className='my-12' />
            </>
          )}

          {(typeFilter === 'All' || typeFilter === 'Past') && (
            <>
              <div className='flex flex-row justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-500 tracking-widest uppercase mb-3'>
                  PAST EVENTS
                </h3>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {pastEvents?.map((event, index) => (
                  <EventHighlightCard key={index} eventId={event.id} />
                ))}
              </div>

              <hr className='my-12' />
            </>
          )}

          {page?.acf?.ad?.link && (
            <Link href={page?.acf?.ad?.link} urlExternal={true}>
              <Image
                src={page?.acf?.ad?.image}
                width={parseInt(page?.acf?.ad?.width)}
                height={parseInt(page?.acf?.ad?.height)}
              />
            </Link>
          )}
        </Section>

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=event`
  )
  const pageData = await pageRes.json()
  const page = pageData?.length > 0 ? pageData[0] : null

  if (!page) {
    return {
      notFound: true,
    }
  }

  /**
   * Featured Events
   */
  const FEATURED_EVENTS_TAG_ID = 408
  const featuredEventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?event_tags=${FEATURED_EVENTS_TAG_ID}&filter[orderby]=date&order=desc`
  )
  const featuredEventsData = await featuredEventsRes.json()
  const featuredEvents = featuredEventsData.slice(0, 4)

  /**
   * Latest Events
   */
  const latestEventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc`
  )
  const latestEventsData = await latestEventsRes.json()
  const latestEvents = latestEventsData.slice(0, 4)

  /**
   * Special Events
   */
  const SPECIAL_EVENTS_TAG_ID = 409
  const specialEventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?event_tags=${SPECIAL_EVENTS_TAG_ID}&filter[orderby]=date&order=desc`
  )
  const specialEventsData = await specialEventsRes.json()
  const specialEvents = specialEventsData.slice(0, 4)

  /**
   * Past Events
   */
  const pastEventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc&per_page=100`
  )
  const pastEventsData = await pastEventsRes.json()
  const pastEvents = pastEventsData
    .filter(
      (event) =>
        event.acf?.information?.times?.length > 0 &&
        new Date(event.acf?.information?.times[0].date) < new Date()
    )
    .slice(0, 4)

  /**
   * Tag
   */
  const tagsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/event_tags`
  )
  const tags = await tagsRes.json()

  /**
   * Types
   */
  const typesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event_type`
  )
  const types = await typesRes.json()

  /**
   * Topics
   */
  const topicsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/event_categories`
  )
  const topics = await topicsRes.json()

  return {
    props: {
      page,
      featuredEvents,
      latestEvents,
      specialEvents,
      pastEvents,
      tags,
      types,
      topics,
    },
    revalidate: 10,
  }
}
