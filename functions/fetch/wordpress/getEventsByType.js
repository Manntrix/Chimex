import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function getEventsByType(typeId, page) {
  const { data, error } = useSWR(
    typeId
      ? `${
          process.env.NEXT_PUBLIC_WP_REST_URL
        }/wp/v2/chime_event?filter[orderby]=date&order=desc&chime_event_type=${typeId}&offset=${
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
