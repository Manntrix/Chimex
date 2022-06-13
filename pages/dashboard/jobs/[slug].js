import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import DashboardLayout from '@/components/common/DashboardLayout'
import RichText from '@/components/organisms/Content/RichText'
import { useRouter } from 'next/router'

export default function FoundationDirectory({ job }) {
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
          <Button
            type='white'
            href='/dashboard/jobs'
            className='block text-blue-turquoise text-sm font-bold hover:underline mx-2 mb-8'
          >
            Back to Search
          </Button>

          <div className='mb-12'>
            <p className='text-3xl font-bold mb-4'>{job.title.rendered}</p>
            <div className='flex gap-1'>
              {job.acf.type?.map((t, index) => (
                <span
                  key={index}
                  className='bg-blue-sky px-1 text-xs text-white capitalize'
                >
                  {t.replace('_', ' ')}
                </span>
              ))}
              <span className='text-xs mx-1'>• {job.acf.full_address}</span>
            </div>
          </div>

          <div>
            <RichText>{job?.content.rendered || ''}</RichText>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const slug = 'frontend-developer-2'

  /**
   * Page Content
   */
  const jobRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/job/?slug=${slug}`
  )
  const jobData = await jobRes.json()
  const job = jobData?.length > 0 ? jobData[0] : null

  if (!job) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      job,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const pagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/job/`
  )
  const pages = await pagesRes.json()

  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: true,
  }
}
