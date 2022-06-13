import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import { EventHighlightCard } from '@/components/molecules/Card'
import Tag from '@/components/molecules/Card/Tag'
import { useSession } from 'next-auth/react'
import Content from '../Content'
import Ad from '../Content/Ad'
import Widget from '../Content/Widget'
import dateFormat from 'dateformat'
import RichText from '../Content/RichText'
import Sponsor from '../Sidebar/Sponsor'
import Speaker from '../Sidebar/Speaker'
import Sidebar from '../Sidebar'
import { useState, useEffect } from 'react'
import { atcb_init } from 'add-to-calendar-button'

export default function EventDetail({
  title,
  thumbnail,
  information,
  top_navs,
  elements,
  ad,
  moreEvents,
  tags,
  sidebar,
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
      <div className='border-b'>
        <Section className='py-3 overflow-auto'>
          <div className='flex gap-5'>
            <Link href='/event' className='hover:underline font-bold mr-5'>
              {'< All Events'}
            </Link>

            {top_navs &&
              top_navs?.map((nav, index) => (
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

      <Section className='py-8 md:py-16'>
        {new Date(information?.times[information?.times?.length - 1].date) <
          new Date() && (
          <div
            style={{ background: 'rgba(253, 244, 154, 0.5)' }}
            className='mb-12 flex px-4 py-2 items-center'
          >
            <Image
              src='/icons/error-black.svg'
              width={16}
              height={16}
              className='mr-2 flex-shrink-0'
            />
            <p className='text-sm font-bold'>
              This event has passed. For more information please contact
              email@chimecentral.org
            </p>
          </div>
        )}

        <div className='flex flex-col lg:flex-row gap-12'>
          <div className='w-full max-w-4xl mx-auto relative'>
            {information?.widget.type !== 'video' && (
              <div className='relative w-full h-64 md:h-96 mb-4'>
                <Image
                  src={thumbnail?.source_url || '/images/blur.png'}
                  fill={true}
                  cover={true}
                />
              </div>
            )}

            {information?.widget.type !== 'none' && (
              <div className='mb-4'>
                <Widget {...information?.widget} />
              </div>
            )}

            <div className='flex flex-row flex-wrap gap-1 mb-6'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='white' />
              ))}
            </div>

            <h2 className='text-3xl md:text-5xl font-bold mt-12 mb-4'>
              {information?.title}
            </h2>

            <p className='text-lg mb-8'>{information?.description}</p>

            <h3 id='details' className='text-3xl font-bold mb-6'>
              Event Details
            </h3>

            <div className='grid md:grid-cols-2 gap-8 mb-12'>
              <div>
                <h4 className='text-lg font-bold mb-4'>Start Date</h4>

                <p>
                  {dateFormat(information?.times[0].date, 'ddd, mmmm d, yyyy')}
                </p>

                <p>{information?.times[0].start_time}</p>

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
                <h4 className='text-lg font-bold mb-4'>End Date</h4>

                <p>
                  {dateFormat(
                    information?.times[information?.times.length - 1].date,
                    'ddd, mmmm d, yyyy'
                  )}
                </p>
                <p>
                  {information?.times[information?.times.length - 1].end_time}
                </p>
              </div>

              <div>
                <h4 className='text-lg font-bold mt-6 mb-4'>Location</h4>

                <p className='max-w-xs tracking-wider'>
                  {information?.location?.full_address}
                </p>

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

              <div className='w-full overflow-hidden'>
                <RichText>{information?.location?.map_embed}</RichText>
              </div>
            </div>

            <Divider />

            {elements && <Content elements={elements} fw={false} />}

            {ad && <Ad {...ad} className='block my-16' />}

            <hr className='my-12' />

            <h3 className='text-lg font-bold uppercase text-gray-400 mb-4 tracking-widest'>
              Related Events
            </h3>

            <div className='grid md:grid-cols-3 gap-6'>
              {moreEvents?.slice(0, 3).map((event, index) => (
                <EventHighlightCard key={index} eventId={event.id} />
              ))}
            </div>
          </div>

          <div className='w-full lg:w-80 lg:px-2 flex-shrink-0'>
            {session?.accessToken && (
              <Button
                href='/dashboard'
                className='w-full text-sm rounded border border-blue-turquoise hover:bg-blue-100 mt-4 mb-12'
                type='custom'
                size='sm'
              >
                <div className='flex justify-center gap-2'>
                  <Image
                    src='/icons/calendar-black.svg'
                    width={16}
                    height={16}
                  />{' '}
                  Back to My Events
                </div>
              </Button>
            )}

            {new Date(information?.times[information?.times.length - 1].date) >
              new Date() && (
              <div className='relative mb-12'>
                <h5 className='text-sm font-bold mb-3'>Registration Fee</h5>

                <p className='text-xl font-bold mb-6'>${information?.price}</p>

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
            )}

            <div className='relative mb-12'>
              <h5 className='text-gray-500 tracking-widest uppercase font-bold mb-3'>
                ORGANIZER
              </h5>

              <div className='bg-gray-100 px-3 py-5'>
                <p className='font-bold mb-2'>Organizer Name</p>

                <p className='text-sm mb-6'>{information?.organizer?.name}</p>

                <Link
                  href={`tel:${information?.organizer?.phone}`}
                  className='flex text-sm font-bold'
                >
                  <Image
                    src='/icons/phone.svg'
                    width={12}
                    height={12}
                    className='mr-2'
                  />
                  <span>{information?.organizer?.phone}</span>
                </Link>
              </div>
            </div>

            <Divider />

            <div className='relative mt-8 mb-12'>
              <h5 className='text-gray-500 tracking-widest uppercase font-bold mb-3'>
                SPEAKERS
              </h5>

              {information?.speakers?.speakers?.length > 0 &&
                information?.speakers?.speakers?.map((speaker, index) => (
                  <Speaker key={index} id={speaker.speaker} />
                ))}
            </div>

            <Divider />

            <div className='relative mt-8 mb-12'>
              <h5 className='text-gray-500 tracking-widest uppercase font-bold mb-3'>
                SPONSORS
              </h5>

              {information?.sponsors?.length > 0 &&
                information?.sponsors?.map((sponsor, index) => (
                  <Sponsor key={index} sponsor={sponsor} />
                ))}
            </div>

            <Divider />

            {sidebar && <Sidebar sidebar={sidebar} />}
          </div>
        </div>
      </Section>
    </>
  )
}
