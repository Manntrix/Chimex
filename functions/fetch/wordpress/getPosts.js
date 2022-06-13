import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getPosts(page) {
  const { data, error } = useSWR(
    page
      ? `${
          process.env.NEXT_PUBLIC_WP_REST_URL
        }/wp/v2/posts/?filter[orderby]=date&order=desc&per_page=10&offset=${
          10 * (page - 1)
        }`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
