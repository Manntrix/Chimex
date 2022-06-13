import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getPageSiblings(parentId) {
  const { data, error } = useSWR(
    parentId
      ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?parent=${parentId}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
