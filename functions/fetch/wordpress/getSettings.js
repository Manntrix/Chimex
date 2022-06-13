import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getSettings() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/acf/v3/options/options`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
