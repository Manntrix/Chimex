import Link from '@/components/atoms/Link'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import DashboardLayout from '@/components/common/DashboardLayout'
import Media from '@/components/molecules/Meta/Media'
import RichText from '@/components/organisms/Content/RichText'
import { useRouter } from 'next/router'

export default function FoundationDirectory({ foundation }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <DashboardLayout>
        <Section>
          <Loading></Loading>
        </Section>
      </DashboardLayout>
    )
  }

  return (
    <>
      <DashboardLayout>
        <div className='max-w-5xl mx-auto w-full overflow-auto px-4'>
          <Link
            href='/dashboard/foundation-directory'
            className='block text-blue-turquoise text-sm font-bold hover:underline mx-2 mb-8'
          >
            Back to Search
          </Link>

          <div className='md:flex gap-8 relative mb-8'>
            <div className='w-40 h-40 relative mb-8'>
              <div className='w-40 h-40 bg-zinc-200'>
                <Media mediaId={foundation.featured_media} />
              </div>
            </div>

            <div className='mb-8'>
              <p className='text-xl font-bold mb-0.5'>
                {foundation.title.rendered}
              </p>

              <p className='text-sm mb-0.5'>
                {foundation?.acf?.contact_name}
                {' - '}
                {foundation?.acf?.contact_title}
              </p>

              <Link
                className='block text-sm text-blue-sky underline mb-0.5'
                href={`mailto:${foundation?.acf?.contact_email}`}
              >
                {foundation?.acf?.contact_email}
              </Link>

              <Link
                className='block text-sm text-blue-sky underline mb-0.5'
                href={`tel:${foundation?.acf?.phone}`}
              >
                {foundation?.acf?.phone}
              </Link>

              <p className='text-sm mb-0.5'>{foundation?.acf?.address_1}</p>
              <p className='text-sm mb-0.5'>
                {foundation?.acf?.city}, {foundation?.acf?.state}{' '}
                {foundation?.acf?.zipcode}
              </p>

              <Link
                className='block text-sm text-blue-sky underline mb-0.5'
                href={foundation?.acf?.link}
                urlExternal={true}
              >
                {foundation?.acf?.link}
              </Link>
            </div>
          </div>

          <div>
            <RichText>{foundation?.content.rendered || ''}</RichText>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const slug = 'samsung-electronics-america'

  /**
   * Page Content
   */
  const foundationRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/foundation_firms/?slug=${slug}`
  )
  const foundationData = await foundationRes.json()
  const foundation = foundationData?.length > 0 ? foundationData[0] : null

  if (!foundation) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      foundation,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const pagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/foundation_firms/`
  )
  const pages = await pagesRes.json()

  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: true,
  }
}
