import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import {
  BlankCard,
  HorizontalCard,
  PostCard,
} from '@/components/molecules/Card'
import PostHero from '@/components/organisms/PostHero'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import unEntry from '@/functions/unEntry'
import Sidebar from '@/components/organisms/Sidebar'
import Ad from '@/components/organisms/Content/Ad'
import { Popover } from '@headlessui/react'
import Image from '@/components/atoms/Image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Transition from '@/components/atoms/Transition'
import Button from '@/components/atoms/Button'
import { useSession } from 'next-auth/react'

export default function BlogPage({
  category,
  posts,
  morePosts,
  sidebar,
  ad,
  partner_contents,
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

  const { data: session } = useSession()

  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Media',
      link: '/blog',
    },
    {
      text: unEntry(category?.name),
    },
  ]

  return (
    <>
      <NextSeo
        title={`Media Category: ${unEntry(category?.name)}`}
        description={category?.description}
      />

      <Layout>
        <PostHero
          breadcrumbs={breadcrumbs}
          title={`Media Category: ${unEntry(category?.name)}`}
        />

        <Section className='border-b py-4'>
          <Popover.Group className='flex flex-row gap-8'>
            <Popover className='relative'>
              <Popover.Button className='flex items-center gap-1 text-sm font-semibold'>
                Media Tag <ChevronDownIcon width={16} height={16} />
              </Popover.Button>

              <Transition>
                <Popover.Panel className='absolute z-20 bg-blue-50 shadow border rounded p-6 top-8 w-56 max-h-96 overflow-y-auto'>
                  {tags.map((tag, index) => (
                    <a
                      key={index}
                      href={`/blog/tag/${tag.slug}`}
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
          <div className='flex flex-col lg:flex-row gap-12'>
            <div className='max-w-4xl mx-auto relative'>
              {posts?.map((post, index) => (
                <div key={index} className='py-6 border-b'>
                  <HorizontalCard key={index} postId={post.id} />
                </div>
              ))}

              <Divider className='mt-16 mb-16' />

              {ad && <Ad {...ad} />}

              <hr className='my-12' />

              <h3 className='text-2xl font-bold text-blue-turquoise mb-4'>
                Related Posts
              </h3>

              <div className='grid md:grid-cols-3 gap-6'>
                {morePosts?.slice(0, 6).map((post, index) => (
                  <PostCard key={index} postId={post.id} />
                ))}
              </div>

              <hr className='my-12' />

              <h3 className='text-2xl font-bold text-blue-turquoise mb-4'>
                {partner_contents?.title}
              </h3>

              <div className='grid md:grid-cols-3 gap-6'>
                {partner_contents?.posts?.slice(0, 6).map((post, index) => (
                  <BlankCard key={index} postId={post.post} />
                ))}
              </div>
            </div>

            <div className='w-full lg:w-80 lg:px-2 flex-shrink-0'>
              {session?.accessToken && (
                <Button
                  href='/dashboard'
                  className='w-full text-sm py-2 border border-blue-turquoise hover:bg-blue-100 mt-4 mb-12'
                  type='custom'
                >
                  <div className='flex justify-center gap-2'>
                    <Image src='/icons/dashboard.svg' width={16} height={16} />{' '}
                    Back to My Dashboard
                  </div>
                </Button>
              )}

              {sidebar && <Sidebar sidebar={sidebar} />}
            </div>
          </div>
        </Section>

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const slug = 'cloud'

  /**
   * Tag
   */
  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/categories/?slug=${slug}`
  )
  const categoryData = await categoryRes.json()
  const category = categoryData?.length > 0 ? categoryData[0] : null

  if (!category) {
    return {
      notFound: true,
    }
  }

  /**
   * Posts
   */
  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc&categories=${category.id}&per_page=100`
  )
  const posts = await postsRes.json()

  /**
   * More Posts
   */
  const morePostsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc`
  )
  const morePosts = await morePostsRes.json()

  /**
   * Bottom & Sidebar
   */
  const sidebarRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/acf/v3/options/options`
  )
  const sidebarData = await sidebarRes.json()
  const {
    post_sidebar_elements: sidebar,
    media_tag_ad: ad,
    partner_contents,
  } = sidebarData?.acf || {}

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
      category,
      posts,
      morePosts,
      ad,
      sidebar,
      partner_contents,
      tags,
      types,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/categories`
  )
  const categories = await categoriesRes.json()

  return {
    paths: categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: true,
  }
}
