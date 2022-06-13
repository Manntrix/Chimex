import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import {
  BlankCard,
  HorizontalCard,
  HorizontalRightCard,
  NormalCard,
} from '@/components/molecules/Card'
import PostHero from '@/components/organisms/PostHero'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import unEntry from '@/functions/unEntry'
import Ad from '@/components/organisms/Content/Ad'
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Transition from '@/components/atoms/Transition'
import Link from '@/components/atoms/Link'
import classNames from 'classnames'

export default function BlogPage({
  blogs,
  stories,
  videos,
  podcasts,
  presses,
  leaderships,
  ad,
  categories,
  tags,
  types,
}) {
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

  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Media',
    },
  ]

  return (
    <>
      <NextSeo title={`Media`} />

      <Layout>
        <PostHero breadcrumbs={breadcrumbs} title={`Media`} />

        <Section className='border-b py-4'>
          <Popover.Group className='flex flex-row gap-8'>
            <Popover className='relative'>
              <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                Media Category <ChevronDownIcon width={16} height={16} />
              </Popover.Button>

              <Transition>
                <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href={`/blog/category/${category.slug}`}
                      className='block mb-1.5 hover:underline'
                    >
                      {unEntry(category.name)}
                    </a>
                  ))}
                </Popover.Panel>
              </Transition>
            </Popover>

            <Popover className='relative'>
              <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                Media Tag <ChevronDownIcon width={16} height={16} />
              </Popover.Button>

              <Transition>
                <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                  {tags.map((tag, index) => (
                    <a
                      key={index}
                      href={`/blog/category/${tag.slug}`}
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
                Media Type <ChevronDownIcon width={16} height={16} />
              </Popover.Button>

              <Transition>
                <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                  {types.map((type, index) => (
                    <a
                      key={index}
                      href={`/blog/media_post_type/${type.slug}`}
                      className='block mb-1.5 hover:underline'
                    >
                      {unEntry(type.name)}
                    </a>
                  ))}
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </Section>

        <Section className='py-8 md:py-16'>
          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>
              News articles
            </h3>

            <Link
              href='/blog/media_post_type/blogs-articles'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-4 gap-6 pb-4 border-b mb-16'>
            {blogs?.slice(0, 4).map((post, index) => (
              <div key={index} className='py-4'>
                <NormalCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>Stories</h3>

            <Link
              href='/blog/media_post_type/stories'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-4 gap-6 pb-4 border-b mb-16'>
            {stories?.slice(0, 4).map((post, index) => (
              <div key={index} className='py-4'>
                <NormalCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>
              CHIME Videos
            </h3>

            <Link
              href='/blog/media_post_type/video'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-4 gap-6 pb-4 border-b mb-16'>
            {videos?.slice(0, 4).map((post, index) => (
              <div key={index} className='py-4'>
                <NormalCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>
              Blog Posts
            </h3>
          </div>

          <div className='grid md:grid-cols-4 gap-6 pb-4 border-b mb-16'>
            <div className='md:col-span-3'>
              {blogs?.slice(4, 7).map((post, index) => (
                <div key={index} className='py-4'>
                  <HorizontalCard key={index} postId={post.id} />
                </div>
              ))}
            </div>

            <div className='md:col-span-1'>
              {blogs?.slice(7, 11).map((post, index) => (
                <div key={index} className='py-4'>
                  <BlankCard key={index} postId={post.id} />
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>Podcasts</h3>

            <Link
              href='/blog/media_post_type/podcasts'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-4 gap-6 pb-4 border-b mb-16'>
            {podcasts?.slice(0, 4).map((post, index) => (
              <div key={index} className='py-4'>
                <NormalCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>
              Press Releases
            </h3>

            <Link
              href='/blog/media_post_type/news-press'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-3 gap-6 pb-4 border-b mb-16'>
            {presses?.slice(0, 6).map((post, index) => (
              <div
                key={index}
                className={classNames('py-4', index < 3 && 'border-b')}
              >
                <BlankCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='text-blue-turquoise text-xl font-bold'>
              Thought Leadership
            </h3>

            <Link
              href='/blog/media_post_type/thought-leadership'
              className='underline text-sm font-bold'
            >
              {'View all >'}
            </Link>
          </div>

          <div className='grid md:grid-cols-2 gap-6 pb-4 border-b mb-16'>
            {leaderships?.slice(0, 4).map((post, index) => (
              <div
                key={index}
                className={classNames('py-4', index < 2 && 'border-b')}
              >
                <HorizontalRightCard key={index} postId={post.id} />
              </div>
            ))}
          </div>

          <Ad {...ad} />
        </Section>

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const BLOG_TYPE = 371
  const STORIES_TYPE = 450
  const VIDEO_TYPE = 377
  const PRESS_TYPE = 372
  const PODCAST_TYPE = 374
  const LEADERSHIP_TYPE = 449

  /**
   * Blogs
   */
  const blogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${BLOG_TYPE}&per_page=11`
  )
  const blogs = await blogsRes.json()

  /**
   * Stories
   */
  const storiesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${STORIES_TYPE}&per_page=4`
  )
  const stories = await storiesRes.json()

  /**
   * Videos
   */
  const videosRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${VIDEO_TYPE}&per_page=4`
  )
  const videos = await videosRes.json()

  /**
   * Presses
   */
  const pressesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${PRESS_TYPE}&per_page=6`
  )
  const presses = await pressesRes.json()

  /**
   * Podcasts
   */
  const podcastsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${PODCAST_TYPE}&per_page=4`
  )
  const podcasts = await podcastsRes.json()

  /**
   * Leaderships
   */
  const leadershipsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&media_post_type=${LEADERSHIP_TYPE}&per_page=4`
  )
  const leaderships = await leadershipsRes.json()

  /**
   * Ad
   */
  const sidebarRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/acf/v3/options/options`
  )
  const sidebarData = await sidebarRes.json()
  const { media_tag_ad: ad } = sidebarData?.acf || {}

  /**
   * Categories
   */
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/categories/?per_page=100`
  )
  const categories = await categoriesRes.json()

  /**
   * Tags
   */
  const tagsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/tags/?per_page=100`
  )
  const tags = await tagsRes.json()

  /**
   * Types
   */
  const typesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/media_post_type/?per_page=100`
  )
  const types = await typesRes.json()

  return {
    props: {
      blogs,
      stories,
      videos,
      podcasts,
      presses,
      leaderships,
      ad,
      categories,
      tags,
      types,
    },
    revalidate: 10,
  }
}
