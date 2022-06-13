import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import Background from '@/components/molecules/Background'
import unEntry from '@/functions/unEntry'
import classNames from 'classnames'
import dateFormat from 'dateformat'

export default function EventHero({
  background,
  breadcrumbs,
  title,
  types,
  times,
  location,
}) {
  return (
    <div style={{ marginTop: '-78px' }}>
      <Section className='relative py-8 md:py-16'>
        <Background image={background?.source_url} />
        <div className='absolute top-0 right-0 w-full h-full -z-10'>
          <Image src='/images/post-hero-shape.svg' fill={true} cover={true} />
        </div>

        <div className='pt-20 md:pt-12'>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </div>

        <div className='flex justify-center py-12'>
          <Image src='/images/event-type-summit.svg' width={110} height={60} />
        </div>

        <div className='flex flex-row justify-center items-center gap-2 mb-4'>
          <div className='flex flex-row justify-start gap-1'>
            {types?.map((type, index) => (
              <div
                key={index}
                className={classNames(
                  'border border-white text-2xs px-2 font-bold',
                  index === 0 ? 'text-blue-sea bg-white' : 'text-white'
                )}
              >
                {unEntry(type.name)}
              </div>
            ))}
          </div>

          {location && (
            <div className='text-2xs text-white flex items-center'>
              <span className='mr-2' style={{ fontSize: '4px' }}>
                &#x2B24;
              </span>
              {location}
            </div>
          )}
        </div>

        <h1 className='text-3xl lg:text-6xl font-bold text-white text-center my-6'>
          {title}
        </h1>

        <p className='text-lg lg:text-2xl font-semibold text-white max-w-2xl mx-auto text-center mb-12'>
          {dateFormat(times[0].date, 'dddd')}
          {', '}
          {times[0].date} {times[0].start_time}
          {' - '}
          {dateFormat(times[times.length - 1].date, 'dddd')}
          {', '}
          {times[times.length - 1].date} {times[times.length - 1].end_time}
        </p>
      </Section>
    </div>
  )
}
