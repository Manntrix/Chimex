import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import Media from '@/components/molecules/Meta/Media'
import PostHero from '@/components/organisms/PostHero'
import getEventsAll from '@/functions/fetch/wordpress/getEventsAll'
import numRange from '@/functions/numRange'
import classNames from 'classnames'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import styles from '@/styles/calendar.module.scss'
import dateFormat from 'dateformat'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function BlogPage() {
  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Events',
    },
  ]

  const [allEvents, setAllEvents] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetch() {
      const allEventsData = await getEventsAll()
      setAllEvents(allEventsData)
    }
    fetch()
  }, [])

  const today = new Date()

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const prevEOD = new Date(year, month, 0)
  const thisEOD = new Date(year, month + 1, 0)

  // Day of week of the first day of this month
  const firstDay = new Date(year, month, 1).getDay()

  useEffect(() => {
    const filteredEvents = allEvents.filter((event) => {
      if (
        event.acf?.information?.times?.some((time) => {
          if (
            time.date &&
            new Date(time.date).getMonth() === month &&
            new Date(time.date).getFullYear() === year
          ) {
            return true
          }
          return false
        })
      ) {
        return true
      }
      return false
    })

    const eventsData = []

    filteredEvents.map((event) => {
      event.acf?.information?.times?.map((time, index) => {
        eventsData.push({
          title: event.title.rendered,
          featured_media: event.featured_media,
          date: new Date(time.date).getDate(),
          start_time: time.start_time,
          end_time: time.end_time,
          multi_day: event.acf?.information?.times?.length > 1 ? true : false,
          first_day: index === 0 ? true : false,
          last_day:
            index === event.acf?.information?.times?.length - 1 ? true : false,
          event_length: event.acf?.information?.times?.length,
          event_index: index,
        })
      })
    })

    setEvents(
      eventsData.reduce((sum, ele) => {
        sum[ele.date] = ele
        return sum
      }, {})
    )
  }, [allEvents, year, month])

  return (
    <>
      <NextSeo title='Events' />

      <Layout>
        <PostHero breadcrumbs={breadcrumbs} title='Events' />

        <Section className='py-8 md:py-16'>
          <div className='flex items-center'>
            <ChevronLeftIcon
              width={24}
              height={24}
              className='hover:bg-gray-200 mx-1 cursor-pointer flex-shrink-0'
              onClick={() => {
                setYear(parseInt(new Date(year, month - 1, 1).getFullYear()))
                setMonth(parseInt(new Date(year, month - 1, 1).getMonth()))
              }}
            />

            <ChevronRightIcon
              width={24}
              height={24}
              className='hover:bg-gray-200 mx-1 cursor-pointer flex-shrink-0'
              onClick={() => {
                setYear(parseInt(new Date(year, month + 1, 1).getFullYear()))
                setMonth(parseInt(new Date(year, month + 1, 1).getMonth()))
              }}
            />

            <div
              className='border border-gray-600 rounded px-2 ml-2 hover:bg-gray-200 cursor-pointer'
              onClick={() => {
                setYear(today.getFullYear())
                setMonth(today.getMonth())
              }}
            >
              Today
            </div>

            <div>
              <select
                value={
                  (year - today.getFullYear()) * 12 + (month - today.getMonth())
                }
                onChange={(e) => {
                  setYear(
                    parseInt(
                      new Date(
                        today.getFullYear(),
                        today.getMonth() + parseInt(e.target.value),
                        1
                      ).getFullYear()
                    )
                  )
                  setMonth(
                    parseInt(
                      new Date(
                        today.getFullYear(),
                        today.getMonth() + parseInt(e.target.value),
                        1
                      ).getMonth()
                    )
                  )
                }}
                className='border-0 outline-none focus:outline-none ring-0 focus:ring-0 text-lg md:text-2xl font-bold pr-12 cursor-pointer mx-1'
              >
                {numRange(-12, 12).map((index) => {
                  return (
                    <option key={index} value={index} className='text-lg'>
                      {dateFormat(
                        new Date(
                          today.getFullYear(),
                          today.getMonth() + index,
                          1
                        ),
                        'mmmm yyyy'
                      )}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </Section>

        <Section className='py-8 md:py-16'>
          {allEvents.length > 0 ? (
            <div className='grid grid-cols-7 gap-0 divide-x divide-y border-b border-r'>
              {numRange(
                prevEOD.getDate() - firstDay + 1,
                prevEOD.getDate()
              ).map((date) => (
                <div key={date} className={styles.dateWrap}>
                  <p className={classNames(styles.date, 'opacity-30')}>
                    {date}
                  </p>
                </div>
              ))}

              {numRange(1, thisEOD.getDate()).map((date) => (
                <div key={date} className={styles.dateWrap}>
                  <p className={styles.date}>{date}</p>

                  {events[date] && (
                    <>
                      <div className='block md:hidden'>
                        <div className='w-1 h-1 rounded-full bg-gray-500 mx-auto'></div>
                      </div>

                      <div className='hidden md:block'>
                        {events[date].multi_day && (
                          <div className='w-full max-w-full overflow-hidden relative h-4'>
                            <div
                              className={classNames(
                                'absolute h-full bg-gradient-to-r from-blue-turquoise to-green-tea z-10',
                                events[date].first_day && 'rounded-l-full',
                                events[date].last_day && 'rounded-r-full'
                              )}
                              style={{
                                width: `${100 * events[date].event_length}%`,
                                left: `-${100 * events[date].event_index}%`,
                              }}
                            >
                              {events[date].first_day && (
                                <p className='text-xs text-white font-bold px-2'>
                                  Muli-day Event
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className='p-3'>
                          {events[date].multi_day && events[date].first_day && (
                            <div className='w-full h-20 mb-2'>
                              <Media
                                mediaId={events[date].featured_media}
                                cover={true}
                              />
                            </div>
                          )}

                          <p className='text-xs font-bold mb-2'>
                            {events[date].start_time} - {events[date].end_time}
                          </p>

                          {events[date].first_day && (
                            <p className='text-xs font-bold'>
                              {events[date].title}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {numRange(1, 6 - thisEOD.getDay()).map((date) => (
                <div key={date} className={styles.dateWrap}>
                  <p className={classNames(styles.date, 'opacity-30')}>
                    {date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </Section>

        <Divider width={12} />
      </Layout>
    </>
  )
}
