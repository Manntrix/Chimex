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
import getEventsByType from '@/functions/fetch/wordpress/getEventsByType'
import { Popover, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import unEntry from '@/functions/unEntry'
import classNames from 'classnames'

export default function BlogPage({ type, total, tags, topics, types }) {
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
  const { data: events } = getEventsByType(type.id, page)

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
      text: type?.name,
    },
  ]

  const [sort, setSort] = useState('Date')
  const [typeFilter, setTypeFilter] = useState('All')

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState(1)

  return (
    <>
      <NextSeo title={`Event: ${type?.name}`} />

      <Layout>
        <PostHero breadcrumbs={breadcrumbs} title={`Event: ${type?.name}`} />

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

          {type?.acf?.ad?.link && (
            <Link href={type.acf.ad.link} urlExternal={true}>
              <Image
                src={type.acf.ad.image}
                width={parseInt(type.acf.ad.width)}
                height={parseInt(type.acf.ad.height)}
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
  const slug = params.slug
  // const slug = 'forum'

  /**
   * Category
   */
  const typeRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event_type/?slug=${slug}`
  )
  const typeData = await typeRes.json()
  const type = typeData?.length > 0 ? typeData[0] : null

  if (!type) {
    return {
      notFound: true,
    }
  }

  /**
   * Events
   */
  const eventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/?filter[orderby]=date&order=desc&chime_event_type=${type.id}`
  )
  const total = eventsRes.headers.get('X-WP-Total')

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
      type,
      total,
      types,
      topics,
      tags,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event_type`
  )
  const categories = await categoriesRes.json()

  return {
    paths: categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: true,
  }
}
