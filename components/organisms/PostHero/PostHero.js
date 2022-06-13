import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import unEntry from '@/functions/unEntry'
import classNames from 'classnames'
import dateFormat from 'dateformat'

export default function PostHero({ breadcrumbs, title, types, date, author }) {
  return (
    <Section className='relative py-8 md:py-16'>
      <div className='absolute top-0 right-0 w-full h-full -z-20 bg-gradient-to-r from-blue-sea to-blue-sky'></div>
      <div className='absolute top-0 right-0 w-full h-full -z-10'>
        <Image src='/images/post-hero-shape.svg' fill={true} cover={true} />
      </div>

      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}

      <h1 className='text-3xl lg:text-6xl font-bold text-white max-w-3xl my-12'>
        {title}
      </h1>

      <div className='flex flex-row justify-start items-center mb-4'>
        <div className='flex flex-row justify-start gap-2'>
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

        {date && (
          <div className='text-2xs text-white mx-4 flex items-center'>
            <span className='mr-2' style={{ fontSize: '4px' }}>
              &#x2B24;
            </span>
            {dateFormat(date, 'mmm d')}
          </div>
        )}

        {author && (
          <div className='text-2xs text-white flex items-center'>
            <span className='mr-2' style={{ fontSize: '4px' }}>
              &#x2B24;
            </span>
            <div className='rounded-full mr-2 overflow-hidden'>
              <Image
                src={author?.simple_local_avatar?.full}
                width={20}
                height={20}
              />
            </div>

            {author?.name}
          </div>
        )}
      </div>
    </Section>
  )
}
