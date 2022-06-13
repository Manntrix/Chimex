import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getEventCategories(postId) {
  const { data, error } = useSWR(
    postId
      ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/event_categories?post=${postId}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
