import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getFoundationSolutions() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/service-type?filter[orderby]=date&order=asc&per_page=100`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
