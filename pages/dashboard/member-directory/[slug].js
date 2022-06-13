import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import DashboardLayout from '@/components/common/DashboardLayout'
import RichText from '@/components/organisms/Content/RichText'
import { useRouter } from 'next/router'

export default function CareerCenter({ member }) {
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
            href='/dashboard/member-directory'
            className='block text-blue-turquoise text-sm font-bold hover:underline mx-2 mb-8'
          >
            Back to Search
          </Link>

          <div className='md:flex gap-8 relative mb-8'>
            <div className='w-40 h-40 relative mb-8'>
              <Image src={member?.acf?.image} fill={true} />
            </div>

            <div className='mb-8'>
              <p className='text-xl font-bold'>
                {member?.acf?.first_name} {member?.acf?.last_name}
              </p>
              <p className='text-sm'>{member?.acf?.position}</p>
              <p className='text-sm'>{member?.acf?.company}</p>
              <Link
                className='block text-sm text-blue-sky hover:underline'
                href={`mailto:${member?.acf?.contact_email}`}
              >
                {member?.acf?.contact_email}
              </Link>
              <Link
                className='block text-sm text-blue-sky hover:underline'
                href={`mailto:${member?.acf?.contact_phone}`}
              >
                {member?.acf?.contact_phone}
              </Link>
              <p className='text-sm'>{member?.acf?.address?.street_1}</p>
              <p className='text-sm'>
                {member?.acf?.address?.city}, {member?.acf?.address?.state}{' '}
                {member?.acf?.address?.zip}, {member?.acf?.address?.country}
              </p>
              <Link
                className='block text-sm text-blue-sky hover:underline'
                href={`mailto:${member?.acf?.website}`}
                urlExternal={true}
              >
                {member?.acf?.website}
              </Link>
            </div>

            <div className='md:absolute top-2 right-2 mb-8'>
              <Button type='white'>Request Edit</Button>
            </div>
          </div>

          <div>
            <RichText>{member?.content.rendered || ''}</RichText>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const slug = 'rene-l-dumont-16'

  /**
   * Page Content
   */
  const memberRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/member_spotlights/?slug=${slug}`
  )
  const memberData = await memberRes.json()
  const member = memberData?.length > 0 ? memberData[0] : null

  if (!member) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      member,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const pagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/member_spotlights/`
  )
  const pages = await pagesRes.json()

  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: true,
  }
}
