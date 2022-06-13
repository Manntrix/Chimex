import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getSearchResults(query, type, page) {
  let order = 'desc'
  // if (sort === 1) order = 'asc'

  const subtype = type || 'chime_event%20post'

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/search?search=${query}&subtype=${subtype}&per_page=10&page=${page}&filter[orderby]=date&order=${order}`,
    fetcher
  )

  return {
    results: data,
    loading: !error && !data,
    error: error,
  }
}

export async function getSearchResultsCount(query, type) {
  const subtype = type || 'chime_event%20post'

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/search?search=${query}&subtype=${subtype}`
  )

  return {
    totalPages: res.headers.get('X-WP-TotalPages'),
    totalPosts: res.headers.get('X-WP-Total'),
  }
}
