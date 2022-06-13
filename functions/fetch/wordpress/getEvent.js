import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getEvent(id) {
  const { data, error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event/${id}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
