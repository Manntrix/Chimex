import { useState } from 'react'
import Section from '@/components/atoms/Section'
import { EventCard, EventListCard } from '@/components/molecules/Card'
import DotCarousel from '@/components/molecules/DotCarousel'
import Image from '@/components/atoms/Image'
import getEvents from '@/functions/fetch/wordpress/getEvents'

export default function CustomEventsOverview({ featured_events }) {
  const [page, setPage] = useState(1)
  const { data: events } = getEvents()
  const future_events = events?.filter(
    (event) => new Date(event.acf?.information?.times[0]?.date) > new Date()
  )

  return (
    <Section className='pb-8'>
      <div className='lg:grid lg:grid-cols-2 gap-12'>
        <div className='mb-12 lg:mb-0'>
          <h4 className='text-gray-500 font-bold tracking-widest mb-8 uppercase'>
            Featured Events
          </h4>

          <div className='overflow-hidden w-full mb-8'>
            <div
              className='flex flex-row gap-6 ease-in-out transition duration-200'
              style={{
                width: `${100 * featured_events?.length}%`,
                transform: `translateX(calc(-${
                  (100 / featured_events?.length) * (page - 1)
                }% - ${6 * (page - 1)}px))`,
              }}
            >
              {featured_events?.map((event, index) => (
                <div
                  key={index}
                  style={{ width: `${100 / featured_events?.length}%` }}
                >
                  <EventCard eventId={event.event} />
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-start px-4'>
            <div className=''>
              <DotCarousel
                currentPage={page}
                totalCount={featured_events?.length}
                pageSize={1}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </div>
        </div>

        <div className='mb-12 lg:mb-0'>
          <h4 className='text-gray-500 font-bold tracking-widest mb-8 uppercase'>
            Upcoming Events
          </h4>

          <div
            className='scrollbar-thin scrollbar-thumb-blue-turquoise scrollbar-thumb-rounded'
            style={{ maxHeight: '586px' }}
          >
            <div className='relative px-6'>
              {future_events?.map((event, index) => (
                <EventListCard key={index} event={event} />
              ))}

              <div className='absolute bottom-0 right-0 -z-20 w-full h-full bg-gradient-to-r from-blue-deep to-blue-dark'></div>
              <div className='absolute bottom-0 right-0 -z-10 w-full'>
                <Image
                  src='/images/event-list-shape.svg'
                  width={540}
                  height={324}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
