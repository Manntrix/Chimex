import Section from '@/components/atoms/Section'
import {
  EventBlankCard,
  EventHorizontalCard,
} from '@/components/molecules/Card'

export default function CustomEventsHighlight({ events }) {
  return (
    <Section>
      <h3 className='text-gray-600 font-bold tracking-widest mb-4 uppercase'>
        EVENT HIGHLIGHTS
      </h3>

      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {events.slice(0, 3).map((event, index) => (
            <EventHorizontalCard key={index} eventId={event.event} />
          ))}
        </div>

        <div className='md:col-span-1'>
          {events.slice(3, 7).map((event, index) => (
            <EventBlankCard key={index} eventId={event.event} />
          ))}
        </div>
      </div>
    </Section>
  )
}
