export default async function getEventsAll() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event?per_page=100`
  )
  const total = res.headers.get('X-WP-TotalPages')

  const allEvents = []

  for (let page = 1; page < parseInt(total) + 1; page++) {
    const eventsRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/chime_event?filter[orderby]=date&order=desc&per_page=100&page=${page}`
    )

    const events = await eventsRes.json()
    allEvents.push(...events)
  }

  return allEvents
}
