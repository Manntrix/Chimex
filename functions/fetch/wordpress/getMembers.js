import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getMembers() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/member_spotlights?filter[orderby]=date&order=desc&per_page=100`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
