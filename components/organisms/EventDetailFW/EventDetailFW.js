import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import { EventHighlightCard, SpeakerCard } from '@/components/molecules/Card'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import Content from '../Content'
import Ad from '../Content/Ad'
import { atcb_init } from 'add-to-calendar-button'
import dateFormat from 'dateformat'

export default function EventDetailFW({
  title,
  information,
  top_navs,
  elements,
  ad,
  moreEvents,
}) {
  const { data: session } = useSession()

  const handleLogin = () => {
    document.getElementById('loginBtn').click()
  }

  const [eventId, setEventId] = useState('')

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/membersuite/getEventId?name=${title}`)
      const data = await res.json()
      if (data?.length > 0) {
        setEventId(data[0].id)
      }
    }
    fetchData()
  }, [title])

  useEffect(atcb_init, [])

  return (
    <>
      <Section className='border-b border-black'>
        <div className='flex flex-row flex-wrap justify-center'>
          {information?.sponsors?.map((sponsor, index) => (
            <div
              key={index}
              className={classNames(
                'w-full md:w-1/5 h-28 px-8 py-2 border-black flex justify-center items-center',
                index !== 0 && 'md:border-l'
              )}
            >
              <div className='relative w-full h-8'>
                <Image src={sponsor.image} fill={true} cover={false} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className='border-b'>
        <Section className='py-3 overflow-auto'>
          <div className='flex gap-5'>
            <Link href='/event' className='hover:underline font-bold mr-5'>
              {'< All Events'}
            </Link>

            {top_navs?.map((nav, index) => (
              <Link
                key={index}
                href={`#${nav.anchor}`}
                className='hover:underline font-bold'
              >
                {nav.title}
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <h2 className='mt-16 md:mt-32 text-3xl md:text-6xl font-bold text-center max-w-xl mx-auto mb-4'>
          {information?.title}
        </h2>

        <p className='text-lg max-w-4xl mx-auto text-center mb-8'>
          {information?.description}
        </p>

        <div className='flex flex-wrap max-w-lg mx-auto justify-evenly items-center mb-8'>
          {session?.accessToken ? (
            <>
              {eventId && (
                <Button
                  href={`https://chime.users.membersuite.com/events/${eventId}/details`}
                  type='secondary'
                  icon='/icons/arrow-right-white.svg'
                  className='mb-4'
                  urlExternal={true}
                >
                  Register Now
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                type='secondary'
                icon='/icons/arrow-right-white.svg'
                className='mb-4'
              >
                Login to Register
              </Button>

              <p className='mb-4'>
                Not a member yet?{' '}
                <Link href='/singup' className='underline font-bold'>
                  Sign up today
                </Link>
              </p>
            </>
          )}
        </div>
      </Section>

      <Section>
        <div className='border-t-2 border-b-2'>
          <h3 className='text-3xl font-bold text-center mt-8 mb-12'>
            Event Details
          </h3>

          <div className='grid md:grid-cols-2 mb-8'>
            <div>
              <p className='font-bold mb-3'>Dates</p>
              <div className='grid md:grid-cols-2 gap-4 text-sm'>
                {information?.times?.map((time, index) => (
                  <div key={index}>
                    <p>{time.date}</p>
                    <p>
                      {time.start_time} - {time.end_time}
                    </p>
                  </div>
                ))}
              </div>

              {information?.times?.length > 0 && (
                <div className='atcb' style={{ display: 'none' }}>
                  {JSON.stringify({
                    name: title,
                    description: information?.description,
                    location: information?.location.full_address,
                    startDate: dateFormat(
                      information?.times[0].date,
                      'yyyy-mm-dd'
                    ),
                    endDate: dateFormat(
                      information?.times[information?.times?.length - 1].date,
                      'yyyy-mm-dd'
                    ),
                    options: [
                      'Apple',
                      'Google',
                      'iCal',
                      'Microsoft365',
                      'Outlook.com',
                      'MicrosoftTeams',
                      'Yahoo',
                    ],
                    trigger: 'click',
                    iCalFileName: 'Reminder-Event',
                  })}
                </div>
              )}
            </div>

            <div>
              <p className='font-bold mb-3'>Location</p>

              <div className='grid md:grid-cols-2 gap-4 text-sm'>
                <p style={{ maxWidth: '200px' }}>
                  {information?.location?.building_name}
                </p>

                <div style={{ maxWidth: '200px' }}>
                  <p>{information?.location.full_address}</p>

                  <Link
                    href={information?.location?.map_link}
                    className='flex items-center text-xs mt-2'
                    urlExternal={true}
                  >
                    <Image
                      src='/icons/direction-blue.svg'
                      width={14}
                      height={14}
                      className='mr-2'
                    />
                    <span>Get Directions</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {elements && <Content elements={elements} />}

      <Section className='pb-16'>
        <h3 className='text-3xl md:text-6xl font-bold text-center mt-12 mb-4'>
          {information?.speakers?.title}
        </h3>

        <p className='text-lg max-w-4xl mx-auto text-center mb-8'>
          {information?.speakers?.description}
        </p>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
          {information?.speakers?.speakers &&
            information?.speakers?.speakers?.map((speaker, index) => (
              <div key={index}>
                <SpeakerCard id={speaker.speaker} />
              </div>
            ))}
        </div>

        <Divider />

        {ad && <Ad {...ad} className='block my-16' />}

        <hr />

        <h3
          className='text-xl tracking-widest font-bold mt-12 mb-4 bg-clip-text inline-block'
          style={{
            backgroundImage: 'linear-gradient(90deg, #0BAFCE 0%, #A8BE4A 100%)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Related Events
        </h3>

        <div className='grid md:grid-cols-4 gap-6'>
          {moreEvents?.slice(0, 4).map((event, index) => (
            <EventHighlightCard key={index} eventId={event.id} />
          ))}
        </div>
      </Section>
    </>
  )
}
