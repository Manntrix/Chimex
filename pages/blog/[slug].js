import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import { BlankCard, PostCard } from '@/components/molecules/Card'
import Ad from '@/components/organisms/Content/Ad'
import AuthorBox from '@/components/organisms/Content/AuthorBox'
import RichText from '@/components/organisms/Content/RichText'
import Share from '@/components/organisms/Content/Share'
import PostHero from '@/components/organisms/PostHero'
import Sidebar from '@/components/organisms/Sidebar'
import getAuthor from '@/functions/fetch/wordpress/getAuthor'
import getTypes from '@/functions/fetch/wordpress/getTypes'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export default function BlogPage({
  post,
  morePosts,
  sidebar,
  partner_contents,
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

  const { data: types } = getTypes(post.id)
  const { data: author } = getAuthor(post.author)

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
      text: post.title?.rendered,
    },
  ]

  return (
    <>
      <NextSeo
        {...post?.yoast_head_json}
        description={post?.yoast_head_json?.og_description}
      />

      <Layout>
        <PostHero
          breadcrumbs={breadcrumbs}
          title={post.title?.rendered}
          types={types}
          date={post.date}
          author={author}
        />

        <Section className='py-8 md:py-16'>
          <div className='flex flex-col lg:flex-row gap-12'>
            <div className='max-w-4xl mx-auto relative'>
              <div className='mb-16'>
                <RichText>{post?.content?.rendered}</RichText>
              </div>

              <Share title={post?.title?.rendered} slug={post?.slug} />

              <Divider className='mt-8' />

              <AuthorBox author={author} />

              {post?.acf?.ad && <Ad {...post.acf.ad} />}

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
  // const slug = 'machine-learning-in-healthcare-a-thought-leadership-roundtable'

  /**
   * Page Content
   */
  const postRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?slug=${slug}`
  )
  const postData = await postRes.json()
  const post = postData?.length > 0 ? postData[0] : null

  if (!post) {
    return {
      notFound: true,
    }
  }

  /**
   * More Posts
   */
  const morePostsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc`
  )
  const morePosts = await morePostsRes.json()

  /**
   * Sidebar
   */
  const sidebarRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/acf/v3/options/options`
  )
  const sidebarData = await sidebarRes.json()
  const { post_sidebar_elements: sidebar, partner_contents } =
    sidebarData?.acf || {}

  return {
    props: {
      post,
      morePosts: morePosts.filter((p) => p.slug !== slug),
      sidebar,
      partner_contents,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/posts/?filter[orderby]=date&order=desc`
  )
  const posts = await postsRes.json()

  return {
    paths: posts
      .filter((post) => post.parent === 0)
      .map((post) => ({
        params: { slug: post.slug },
      })),
    fallback: true,
  }
}
