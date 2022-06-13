import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getFoundationType(typeId) {
  const { data, error } = useSWR(
    typeId
      ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/firm-type/${typeId}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
