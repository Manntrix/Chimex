import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@/components/molecules/Pagination'
import {
  getSearchResults,
  getSearchResultsCount,
} from '@/functions/fetch/wordpress/getSearchResults'
import Layout from '@/components/common/Layout'
import Section from '@/components/atoms/Section'
import PostHero from '@/components/organisms/PostHero'
import {
  EventHorizontalRightCard,
  HorizontalRightCard,
} from '@/components/molecules/Card'

export default function Search() {
  const router = useRouter()
  const { q, type } = router.query

  const [page, setpage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [totalPosts, settotalPosts] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const { totalPages, totalPosts } = await getSearchResultsCount(q, type)
      settotalPages(totalPages)
      settotalPosts(totalPosts)
    }
    fetchData()
  }, [q, page])

  const { results } = getSearchResults(q, type, page)

  return (
    <Layout>
      <PostHero title={`Search Results for “${q?.replace('+', ' ')}”`} />

      <Section>
        <p className='text-base text-purple-dark font-bold p-2 my-8'>
          ({totalPosts}) Search Results for “
          <span className='capitalize'>{q?.replace('+', ' ')}</span>”
        </p>

        <div className=''>
          {Array.isArray(results) &&
            results.map((result, index) => (
              <div key={index} className='py-8 border-b'>
                {result.subtype === 'chime_event' && (
                  <EventHorizontalRightCard eventId={result.id} />
                )}

                {result.subtype === 'post' && (
                  <HorizontalRightCard postId={result.id} />
                )}
              </div>
            ))}
        </div>

        <div className='my-12'>
          <Pagination
            className='pagination-bar'
            currentPage={page}
            totalCount={totalPages}
            pageSize={1}
            onPageChange={(page) => setpage(page)}
          />
        </div>
      </Section>
    </Layout>
  )
}
