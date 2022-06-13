import Divider from '@/components/atoms/Divider'
import Section from '@/components/atoms/Section'
import classNames from 'classnames'
import Collapse from './Collapse'

export default function EventSchedule({
  anchor,
  title,
  description,
  notification,
  days,
  fw,
}) {
  return (
    <>
      <div
        id={anchor}
        className={classNames('relative', fw ? 'py-16' : 'py-8')}
      >
        <Section>
          {fw ? (
            <>
              <h2 className='text-6xl text-center font-bold mb-4'>{title}</h2>

              {description && (
                <p className='text-lg text-center max-w-3xl mx-auto mb-16'>
                  {description}
                </p>
              )}

              {notification && <p className='mb-4'>{notification}</p>}
            </>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-4'>{title}</h2>

              {description && <p className='mb-4'>{description}</p>}

              {notification && <p className='mb-4'>{notification}</p>}
            </>
          )}

          {days.map((day, index) => (
            <Collapse key={index} {...day} defaultExpanded={index === 0} />
          ))}
        </Section>
      </div>

      {!fw && <Divider />}
    </>
  )
}
