import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import DashboardLayout from '@/components/common/DashboardLayout'
import Content from '@/components/organisms/Content'
import DateDiff from 'date-diff'
import { useSession } from 'next-auth/react'

export default function Dashboard({ page }) {
  const { data: session } = useSession()
  const dateDiff = new DateDiff(
    new Date(session?.membership?.expireAt),
    new Date()
  )

  return (
    <>
      <DashboardLayout>
        <Section>
          <h1 className='text-2xl text-blue-deep font-bold uppercase mb-8'>
            My Dashboard
          </h1>

          <div className='shadow rounded border mb-8 p-5 bg-white'>
            <div className='flex flex-col md:flex-row justify-between'>
              <div className='flex gap-2'>
                <div className='rounded-full bg-gray-600 text-white text-sm px-3'>
                  {session?.membership?.type}
                </div>
                <div className='px-3 text-sm text-red-700 font-bold'>
                  Grace Period: {parseInt(dateDiff?.days())} days left
                </div>
              </div>

              <div className='flex gap-4'>
                <Link
                  href='/membership/renew'
                  className='text-sm text-blue-sky hover:underline'
                >
                  Renew Membership
                </Link>

                <Link
                  href='/my-account'
                  className='text-sm text-blue-sky hover:underline'
                >
                  Manage Account
                </Link>
              </div>
            </div>

            <h2 className='text-blue-deep text-6xl font-bold font-work my-4'>{`${session?.firstName} ${session?.lastName}`}</h2>

            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
              <div className='text-blue-deep'>
                <span className='font-bold'>Member ID: </span>
                {session?.userId}
              </div>
              <div className='text-blue-deep'>
                <span className='font-bold'>Association: </span>
                {session?.membership?.product}
              </div>
            </div>
          </div>
        </Section>

        {page?.acf?.elements && <Content elements={page?.acf?.elements} />}
      </DashboardLayout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=dashboard`
  )
  const pageData = await pageRes.json()
  const page = pageData?.length > 0 ? pageData[0] : null

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}
