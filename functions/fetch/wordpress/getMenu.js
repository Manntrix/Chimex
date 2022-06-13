import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getMenu(slug) {
  const { data, error } = useSWR(
    slug
      ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/menus/v1/menus/${slug}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
