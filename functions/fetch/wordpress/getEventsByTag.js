import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getEventsByTag(tagId, page) {
  const { data, error } = useSWR(
    tagId
      ? `${
          process.env.NEXT_PUBLIC_WP_REST_URL
        }/wp/v2/chime_event?filter[orderby]=date&order=desc&event_tags=${tagId}&offset=${
          (page - 1) * 10
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
