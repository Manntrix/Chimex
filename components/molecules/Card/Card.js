import { useState } from 'react'
import getPost from '@/functions/fetch/wordpress/getPost'
import Background from '../Background'
import getMedia from '@/functions/fetch/wordpress/getMedia'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import getTags from '@/functions/fetch/wordpress/getTags'
import Tag from './Tag'
import dateFormat from 'dateformat'
import HTMLReactParser from 'html-react-parser'
import getTypes from '@/functions/fetch/wordpress/getTypes'
import Type from './Type'
import getEvent from '@/functions/fetch/wordpress/getEvent'
import getEventTypes from '@/functions/fetch/wordpress/getEventTypes'
import getEventTags from '@/functions/fetch/wordpress/getEventTags'
import ReactPlayer from 'react-player'
import unEntry from '@/functions/unEntry'
import RichText from '@/components/organisms/Content/RichText'
import Button from '@/components/atoms/Button'
import getSpeaker from '@/functions/fetch/wordpress/getSpeaker'
import { Popover } from '@headlessui/react'
import Transition from '@/components/atoms/Transition'
import classNames from 'classnames'
import getJobs from '@/functions/fetch/wordpress/getJobs'

export default function Card({
  background_image,
  title,
  button_text,
  button_link,
}) {
  return (
    <div className='relative'>
      {background_image ? (
        <Background image={background_image} overlay='light' />
      ) : (
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-sky to-blue-turquoise -z-10'></div>
      )}

      <div className='p-6'>
        <h3 className='text-white text-3xl font-bold line-clamp-3 mt-8 mb-12'>
          {title}
        </h3>

        <div className='flex flex-row justify-between'>
          <Link href={button_link} className='text-white underline'>
            {button_text}
          </Link>

          <Link href={button_link}>
            <Image src='/icons/arrow-right-circle.svg' width={32} height={32} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AdCard({ ad }) {
  return (
    <div
      className='relative max-w-full max-h-full'
      style={{ width: '300px', height: '250px' }}
    >
      <Link href={ad.link} urlExternal={true}>
        <Image src={ad.image} fill={true} cover={true} />
      </Link>
    </div>
  )
}

export function BlankCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: types } = getTypes(postId)

  return (
    <Link href={`/posts/${post?.slug}`}>
      <p className='text-xs text-gray-500 mb-2'>
        {dateFormat(post?.date, 'mmm d, yyyy')}
      </p>

      <h3 className='text-lg font-bold line-clamp-3 mb-4'>
        {post?.title?.rendered}
      </h3>

      <div className='flex flex-row flex-wrap gap-1 mb-4'>
        {types?.length > 0 ? (
          types
            ?.slice(0, 2)
            .map((tag, index) => (
              <Type
                key={index}
                tag={tag}
                type={index === 0 ? 'blue' : 'green'}
              />
            ))
        ) : (
          <div className='h-3'></div>
        )}
      </div>
    </Link>
  )
}

export function FeaturedCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative'>
      <Link href={`/posts/${post?.slug}`}>
        <div className='w-full h-80 relative mb-8'>
          <Image
            src={media?.source_url || '/images/blur.png'}
            fill={true}
            cover={true}
          />

          <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4'>
            {tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type='black' />
            ))}
          </div>
        </div>

        <p className='text-xs text-gray-500 mb-2'>
          {dateFormat(post?.date, 'mmm d, yyyy')}
        </p>

        <h3 className='text-3xl font-bold line-clamp-3 mb-4'>
          {post?.title?.rendered}
        </h3>

        {types?.length > 0 && (
          <div className='flex flex-row flex-wrap gap-1 mb-4'>
            {types?.slice(0, 2)?.map((type, index) => (
              <Type
                key={index}
                tag={type}
                type={index === 0 ? 'blue' : 'green'}
              />
            ))}
          </div>
        )}

        <div className='line-clamp-3 mb-8'>
          {HTMLReactParser(post?.excerpt?.rendered || '')}
        </div>
      </Link>
    </div>
  )
}

export function FullCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative border rounded-sm mb-8'>
      <Link href={`/posts/${post?.slug}`} className='h-full flex flex-col'>
        <div className='w-full h-80 relative mb-8'>
          <Image
            src={media?.source_url || '/images/blur.png'}
            fill={true}
            cover={true}
          />

          <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4'>
            {tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type='black' />
            ))}
          </div>
        </div>

        <div className='p-4'>
          <p className='text-xs text-gray-500 mb-2'>
            {dateFormat(post?.date, 'mmm d, yyyy')}
          </p>

          <h3 className='text-3xl font-bold line-clamp-3 mb-4'>
            {post?.title?.rendered}
          </h3>

          {types?.length > 0 && (
            <div className='flex flex-row flex-wrap gap-1 mb-4'>
              {types?.slice(0, 2)?.map((type, index) => (
                <Type
                  key={index}
                  tag={type}
                  type={index === 0 ? 'blue' : 'green'}
                />
              ))}
            </div>
          )}

          <div className='line-clamp-3 mb-8'>
            {HTMLReactParser(post?.excerpt?.rendered || '')}
          </div>
        </div>
      </Link>
    </div>
  )
}

export function PostCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)

  return (
    <Link href={`/posts/${post?.slug}`}>
      <div className='w-full h-40 relative mb-4'>
        <Image
          src={media?.source_url || '/images/blur.png'}
          fill={true}
          cover={true}
        />
        <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1'>
          {tags?.length > 0 ? (
            tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type='white' />
            ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>
      </div>

      <p className='text-xs text-gray-500 mb-2'>
        {dateFormat(post?.date, 'mmm d, yyyy')}
      </p>

      <h3 className='text-lg font-bold line-clamp-3 mb-4'>
        {post?.title?.rendered}
      </h3>
    </Link>
  )
}

export function NormalCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative'>
      <Link href={`/posts/${post?.slug}`}>
        <div className='w-full h-40 relative mb-4'>
          <Image
            src={media?.source_url || '/images/blur.png'}
            fill={true}
            cover={true}
          />
          <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1'>
            {tags?.length > 0 ? (
              tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='white' />
              ))
            ) : (
              <div className='h-3'></div>
            )}
          </div>
        </div>

        <p className='text-xs text-gray-500 mb-2'>
          {dateFormat(post?.date, 'mmm d, yyyy')}
        </p>

        <h3 className='text-lg font-bold line-clamp-3 mb-4'>
          {post?.title?.rendered}
        </h3>

        <div className='flex flex-row flex-wrap gap-1 mb-4'>
          {types?.length > 0 ? (
            types
              ?.slice(0, 2)
              .map((tag, index) => (
                <Type
                  key={index}
                  tag={tag}
                  type={index === 0 ? 'blue' : 'green'}
                />
              ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>
      </Link>
    </div>
  )
}

export function VerticalCard({ postId, background, ctaLink, ctaText }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative border border-green-bright'>
      {background === 'white' ? (
        <div className='absolute top-0 left-0 w-full h-full bg-white -z-10'></div>
      ) : background === 'image' && post?.featured_media ? (
        <Background image={media?.source_url} overlay='light' />
      ) : (
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-sky to-blue-turquoise -z-10'></div>
      )}

      <div className='p-6'>
        <div className='flex flex-row flex-wrap gap-1 mb-4'>
          {tags?.length > 0 ? (
            tags?.map((tag, index) => (
              <Tag
                key={index}
                tag={tag}
                type={background === 'white' ? 'black' : 'white'}
              />
            ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>

        <p className='text-xs text-gray-500 mb-2'>
          {dateFormat(post?.date, 'mmm d, yyyy')}
        </p>

        <h3
          className={classNames(
            'text-lg font-bold line-clamp-3 mb-6',
            background === 'white' ? 'text-black' : 'text-white'
          )}
        >
          {post?.title?.rendered}
        </h3>

        <div className='flex flex-row flex-wrap gap-1 mb-24'>
          {types?.length > 0 ? (
            types
              ?.slice(0, 2)
              ?.map((type, index) => (
                <Type
                  key={index}
                  tag={type}
                  type={
                    index === 0
                      ? 'blue'
                      : background === 'white'
                      ? 'green'
                      : 'white'
                  }
                />
              ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>

        <div className='flex flex-row justify-between'>
          <Link
            href={ctaLink || `/posts/${post?.slug}`}
            className={classNames(
              'underline',
              background === 'white' ? 'text-black' : 'text-white'
            )}
          >
            {ctaText || 'Read More'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export function HorizontalCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative w-full'>
      <Link href={`/blog/${post?.slug}`}>
        <div className='flex flex-col md:flex-row md:justify-between gap-8'>
          <div className='w-full md:w-80 h-56 relative flex-shrink-0'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-xl font-bold mt-1 mb-4'>
              {unEntry(post?.title?.rendered || '')}
            </h3>

            <div className='flex flex-row justify-start items-center mb-4'>
              <div className='flex flex-row flex-wrap items-center gap-1 mr-4'>
                {types?.length > 0 ? (
                  types
                    ?.slice(0, 2)
                    .map((type, index) => (
                      <Type
                        key={index}
                        tag={type}
                        type={index === 0 ? 'blue' : 'green'}
                      />
                    ))
                ) : (
                  <div className='h-3'></div>
                )}

                <p className='text-2xs text-gray-500 ml-2'>
                  • {dateFormat(post?.date, 'mmm d, yyyy')}
                </p>
              </div>
            </div>

            <div className='line-clamp-3 mt-8'>
              <RichText>{post?.excerpt?.rendered || ''}</RichText>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export function HorizontalRightCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(postId)
  const { data: types } = getTypes(postId)

  return (
    <div className='relative w-full'>
      <Link href={`/blog/${post?.slug}`}>
        <div className='flex flex-col md:flex-row md:justify-between gap-8'>
          <div>
            <h3 className='text-lg font-bold line-clamp-1 mt-4 mb-4'>
              {unEntry(post?.title?.rendered || '')}
            </h3>

            <div className='flex flex-row justify-start items-center mb-4'>
              <div className='flex flex-row flex-wrap gap-1 mr-4'>
                {types?.length > 0 ? (
                  types
                    ?.slice(0, 2)
                    .map((type, index) => (
                      <Type
                        key={index}
                        tag={type}
                        type={index === 0 ? 'blue' : 'green'}
                      />
                    ))
                ) : (
                  <div className='h-3'></div>
                )}
              </div>
            </div>

            <div className='line-clamp-3 mt-8'>
              <RichText>{post?.excerpt?.rendered || ''}</RichText>
            </div>
          </div>

          <div className='w-full md:w-80 h-48 relative flex-shrink-0'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export function EventCard({ eventId }) {
  const { data: event } = getEvent(eventId)
  const { data: media } = getMedia(event?.featured_media)
  const { data: tags } = getEventTags(eventId)
  const { data: types } = getEventTypes(eventId)

  const { type, video, audio, download, link } =
    event?.acf?.information?.widget || {}
  const [videoActive, setVideoActive] = useState(false)

  return (
    <div className='relative w-full border'>
      {type === 'video' && video && (
        <div className='w-full h-80 relative'>
          <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
            {tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type='white' />
            ))}
          </div>

          <div
            className={classNames(
              'absolute left-0 top-0 w-full h-full',
              videoActive && 'z-20'
            )}
            onClick={() => setVideoActive(true)}
          >
            <ReactPlayer
              url={video.file}
              controls={true}
              width='100%'
              height='100%'
              light={video?.placeholder_image || '/images/blur.png'}
              playIcon={
                <Image src='/icons/play-white.svg' width={120} height={120} />
              }
            />
          </div>

          <div
            className='absolute left-6 bottom-6 w-16 h-16 rounded z-10 py-2'
            style={{
              background:
                'linear-gradient(135.81deg, #ABC61F 10.38%, #0075BD 91.55%)',
            }}
          >
            <p className='text-white text-3xl font-bold text-center leading-7'>
              {dateFormat(event?.acf?.start_time, 'd')}
            </p>

            <p className='text-white text-xl text-center leading-5'>
              {dateFormat(event?.acf?.start_time, 'mmm')}
            </p>
          </div>
        </div>
      )}

      {type === 'audio' && audio && (
        <>
          <div className='w-full h-80 relative'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>

            <div className='absolute bottom-1 left-0 w-full h-16'>
              <ReactPlayer
                url={audio.file}
                controls={true}
                width='100%'
                height='100%'
              />
            </div>
          </div>
        </>
      )}

      {type === 'download' && download && (
        <>
          <div className='w-full h-80 relative'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>

            <div className='absolute bottom-1 left-0 w-full bg-blue-deep text-white px-4 py-4 rounded-lg flex items-center gap-4 mt-4'>
              <div>
                <h4 className='text-lg font-bold line-clamp-1'>
                  {download.title}
                </h4>
                <p className='text-sm line-clamp-1'>{download.subtitle}</p>
              </div>

              <div className='w-5 flex-shrink-0'>
                <Link
                  href={download.file}
                  urlExternal={true}
                  attributes={{ download: true }}
                >
                  <Image
                    src='/icons/download-white.svg'
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {type === 'link' && link && (
        <>
          <div className='w-full h-80 relative'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>

            <div className='absolute bottom-1 left-0 w-full bg-blue-deep text-white px-4 py-4 rounded-lg flex items-center gap-4 mt-4'>
              <div>
                <h4 className='text-lg font-bold line-clamp-1'>{link.title}</h4>
                <p className='text-sm line-clamp-1'>{link.subtitle}</p>
              </div>

              <div className='w-5 flex-shrink-0'>
                <Link href={link.url} urlExternal={true}>
                  <Image src='/icons/link-white.svg' width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <div className='px-4 py-6'>
        <h3 className='text-3xl font-bold line-clamp-1 mb-4'>
          {event?.title?.rendered}
        </h3>

        <div className='flex flex-row justify-start items-center mb-4'>
          <div className='flex flex-row flex-wrap gap-1 mr-4'>
            {types?.length > 0 ? (
              types
                ?.slice(0, 2)
                ?.map((type, index) => (
                  <Type
                    key={index}
                    tag={type}
                    type={index === 0 ? 'blue' : 'green'}
                  />
                ))
            ) : (
              <div className='h-3'></div>
            )}
          </div>

          <span className='text-xs font-bold text-gray-500'>
            {event?.acf?.event_location?.address}
          </span>
        </div>

        <div className='line-clamp-3 mb-8'>
          {HTMLReactParser(event?.excerpt?.rendered || '')}
        </div>

        <Link
          href={event?.acf?.registration_link || `/events/${event?.slug}`}
          urlExternal={true}
        >
          <div className='flex flex-row gap-2'>
            <span className='text-lg font-bold underline'>Register now</span>
            <Image src='/icons/arrow-right-black.svg' width={18} height={18} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export function EventListCard({ event }) {
  const { data: types } = getEventTypes(event.id)

  return (
    <div className='relative w-full border-b border-gray-100 border-opacity-20 py-6'>
      <div className='flex flex-row gap-4 items-start'>
        <div className='bg-gradient-to-br from-green-bright to-blue-sky p-0.5 rounded'>
          <div className='bg-blue-deep p-2 w-16 h-16 rounded'>
            <p className='text-white text-3xl font-bold text-center leading-7'>
              {dateFormat(event?.acf?.start_time, 'd')}
            </p>

            <p className='text-white text-xl text-center leading-5'>
              {dateFormat(event?.acf?.start_time, 'mmm')}
            </p>
          </div>
        </div>

        <div>
          <Link href={`/events/${event.slug}`}>
            <h3 className='text-lg text-white font-bold line-clamp-2 mb-4'>
              {event?.title?.rendered}
            </h3>
          </Link>

          <div className='flex flex-row justify-start'>
            <div className='flex flex-row flex-wrap gap-1 mr-4'>
              {types?.length > 0 ? (
                types
                  ?.slice(0, 2)
                  ?.map((type, index) => (
                    <Type
                      key={index}
                      tag={type}
                      type={index === 0 ? 'white' : 'blue'}
                    />
                  ))
              ) : (
                <div className='h-3'></div>
              )}
            </div>

            <span className='text-xs font-bold text-gray-500'>
              {event?.acf?.event_location?.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EventHighlightCard({ eventId }) {
  const { data: event } = getEvent(eventId)
  const { data: media } = getMedia(event?.featured_media)
  const { data: tags } = getEventTags(eventId)
  const { data: types } = getEventTypes(eventId)

  return (
    <div className='relative w-full'>
      <Link href={`/events/${event?.slug}`}>
        <div className='w-full h-44 relative mb-4'>
          <Image
            src={media?.source_url || '/images/blur.png'}
            fill={true}
            cover={true}
          />

          <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
            {tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type='black' />
            ))}
          </div>

          <div
            className='absolute left-4 bottom-4 w-12 h-12 rounded z-10 py-2'
            style={{
              background:
                'linear-gradient(135.81deg, #ABC61F 10.38%, #0075BD 91.55%)',
            }}
          >
            <p className='text-white text-xl font-bold text-center leading-5'>
              {dateFormat(event?.acf?.start_time, 'd')}
            </p>

            <p className='text-white text-base text-center leading-4'>
              {dateFormat(event?.acf?.start_time, 'mmm')}
            </p>
          </div>
        </div>

        <h3 className='text-lg font-bold line-clamp-1 mb-4'>
          {unEntry(event?.title?.rendered || '')}
        </h3>

        <div className='flex flex-row justify-start items-center mb-4'>
          <div className='flex flex-row flex-wrap gap-1 mr-4'>
            {types?.length > 0 ? (
              types
                ?.slice(0, 1)
                ?.map((type, index) => (
                  <Type
                    key={index}
                    tag={type}
                    type={index === 0 ? 'blue' : 'green'}
                  />
                ))
            ) : (
              <div className='h-3'></div>
            )}

            {event?.acf?.information?.location?.short_address && (
              <span className='text-xs text-gray-500 flex items-center'>
                <span
                  style={{ fontSize: '4px' }}
                  className='mx-2 text-gray-500'
                >
                  &#x2B24;
                </span>
                {event?.acf?.information?.location?.short_address}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export function EventHorizontalCard({ eventId }) {
  const { data: event } = getEvent(eventId)
  const { data: media } = getMedia(event?.featured_media)
  const { data: tags } = getEventTags(eventId)
  const { data: types } = getEventTypes(eventId)

  return (
    <div className='relative w-full'>
      <Link href={`/events/${event?.slug}`}>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-64 h-44 relative mb-4 flex-shrink-0'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>

            <div
              className='absolute left-4 bottom-4 w-12 h-12 rounded z-10 py-2'
              style={{
                background:
                  'linear-gradient(135.81deg, #ABC61F 10.38%, #0075BD 91.55%)',
              }}
            >
              <p className='text-white text-xl font-bold text-center leading-5'>
                {dateFormat(event?.acf?.start_time, 'd')}
              </p>

              <p className='text-white text-base text-center leading-4'>
                {dateFormat(event?.acf?.start_time, 'mmm')}
              </p>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold line-clamp-1 mt-2 mb-4'>
              {unEntry(event?.title?.rendered || '')}
            </h3>

            <div className='flex flex-row justify-start items-center mb-4'>
              <div className='flex flex-row flex-wrap gap-1 mr-4'>
                {types?.length > 0 ? (
                  types
                    ?.slice(0, 2)
                    ?.map((type, index) => (
                      <Type
                        key={index}
                        tag={type}
                        type={index === 0 ? 'blue' : 'green'}
                      />
                    ))
                ) : (
                  <div className='h-3'></div>
                )}
              </div>

              <span className='text-xs font-bold text-gray-500'>
                {event?.acf?.event_location?.short_address}
              </span>
            </div>

            <div className='line-clamp-3 mt-8'>
              <RichText>{event?.excerpt?.rendered || ''}</RichText>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export function EventHorizontalRightCard({ eventId }) {
  const { data: event } = getEvent(eventId)
  const { data: media } = getMedia(event?.featured_media)
  const { data: tags } = getEventTags(eventId)
  const { data: types } = getEventTypes(eventId)

  return (
    <div className='relative w-full'>
      <Link href={`/events/${event?.slug}`}>
        <div className='flex flex-col md:flex-row md:justify-between gap-8'>
          <div className='flex gap-8'>
            <div
              className='w-12 h-12 rounded z-10 flex-shrink-0 mt-4 p-0.5'
              style={{
                background:
                  'linear-gradient(135.81deg, #ABC61F 10.38%, #0075BD 91.55%)',
              }}
            >
              <div className='bg-white w-full h-full rounded py-1.5'>
                <p className='text-xl font-bold text-center leading-5'>
                  {dateFormat(event?.acf?.start_time, 'd')}
                </p>

                <p className='text-sm uppercase text-center leading-4'>
                  {dateFormat(event?.acf?.start_time, 'mmm')}
                </p>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-bold line-clamp-1 mt-4 mb-4'>
                {unEntry(event?.title?.rendered || '')}
              </h3>

              <div className='flex flex-row justify-start items-center mb-4'>
                <div className='flex flex-row flex-wrap gap-1 mr-4'>
                  {types?.length > 0 ? (
                    types
                      ?.slice(0, 2)
                      ?.map((type, index) => (
                        <Type
                          key={index}
                          tag={type}
                          type={index === 0 ? 'blue' : 'green'}
                        />
                      ))
                  ) : (
                    <div className='h-3'></div>
                  )}
                </div>

                <span className='text-xs font-bold text-gray-500'>
                  {event?.acf?.event_location?.short_address}
                </span>
              </div>

              <div className='line-clamp-3 mt-8'>
                <RichText>{event?.excerpt?.rendered || ''}</RichText>
              </div>
            </div>
          </div>

          <div className='w-full md:w-80 h-56 relative flex-shrink-0'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />

            <div className='absolute top-4 left-4 flex flex-row flex-wrap gap-1 mb-4 z-10'>
              {tags?.map((tag, index) => (
                <Tag key={index} tag={tag} type='black' />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export function EventBlankCard({ eventId }) {
  const { data: post } = getEvent(eventId)
  const { data: types } = getEventTypes(eventId)

  return (
    <div className='relative border-b mb-4'>
      <Link href={`/posts/${post?.slug}`}>
        <p className='text-xs text-gray-500 mb-2'>
          {dateFormat(post?.date, 'mmm d, yyyy')}
        </p>

        <h3 className='text-lg font-bold line-clamp-3 mb-4'>
          {post?.title?.rendered}
        </h3>

        <div className='flex flex-row flex-wrap gap-1 mb-4'>
          {types?.length > 0 ? (
            types
              ?.slice(0, 2)
              ?.map((tag, index) => (
                <Type
                  key={index}
                  tag={tag}
                  type={index === 0 ? 'blue' : 'green'}
                />
              ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>
      </Link>
    </div>
  )
}

export function EventDashboardCard({ eventId }) {
  const { data: post } = getEvent(eventId)
  const { data: tags } = getEventTags(eventId)
  const { data: types } = getEventTypes(eventId)

  return (
    <div className='relative border border-green-bright bg-white'>
      <div className='p-6'>
        <div className='flex flex-row flex-wrap gap-2 mb-4'>
          {tags?.length > 0 ? (
            tags?.map((tag, index) => (
              <Tag key={index} tag={tag} type={'text'} />
            ))
          ) : (
            <div className='h-3'></div>
          )}
        </div>

        <h3
          className={classNames(
            'text-lg font-bold line-clamp-3 mb-3',
            'text-black'
          )}
        >
          {post?.title?.rendered}
        </h3>

        <div className='flex flex-row flex-wrap items-center gap-2 mb-4'>
          {types?.length > 0 ? (
            types
              ?.slice(0, 1)
              .map((type, index) => (
                <Type
                  key={index}
                  tag={type}
                  type={index === 0 ? 'sky' : 'green'}
                />
              ))
          ) : (
            <div className='h-3'></div>
          )}

          <p className='text-2xs text-gray-500'>
            • {dateFormat(post?.date, 'mmm d, yyyy')}
          </p>
        </div>

        <div className='text-xs line-clamp-5 mb-4'>
          {post?.excerpt?.rendered && (
            <RichText>{post?.excerpt.rendered}</RichText>
          )}
        </div>

        <div className='flex flex-row justify-end'>
          <Button
            type='custom'
            size='sm'
            className='text-blue-turquoise text-sm border border-blue-turquoise hover:bg-blue-100'
            href={`/posts/${post?.slug}`}
          >
            {'View Event Details'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CustomDashboardCard({
  title,
  description,
  button_text,
  button_link,
  is_cta,
  background_type,
}) {
  if (is_cta) {
    return (
      <Link href={button_link}>
        <div className='relative h-full flex items-center'>
          <div
            className={classNames(
              'absolute w-full h-full top-0 left-0 bg-gradient-to-r flex items-center',
              background_type === 'dark'
                ? 'from-blue-dark to-blue-deep'
                : 'from-blue-sky to-blue-turquoise'
            )}
          ></div>

          {background_type === 'dark' ? (
            <Image
              src='/images/footer-shape.svg'
              className='absolute w-full h-full'
              fill={true}
              cover={true}
            />
          ) : (
            <Image
              src='/images/dashboard-card-white-shape.svg'
              className='absolute w-full h-full'
              fill={true}
              cover={true}
            />
          )}

          <div className='relative p-6'>
            <h3
              className={classNames('text-2xl line-clamp-3 mb-4', 'text-white')}
            >
              {title}
            </h3>

            <p className='text-sm line-clamp-5 mb-4 text-white'>
              <p>{description}</p>
            </p>
          </div>
        </div>
      </Link>
    )
  } else {
    return (
      <div className='relative border border-green-bright bg-white h-full'>
        <div className='p-6 h-full flex flex-col justify-between'>
          <h3
            className={classNames(
              'text-lg font-bold line-clamp-3 mb-3',
              'text-black'
            )}
          >
            {title}
          </h3>

          <p className='text-xs line-clamp-5 mb-4'>
            <p>{description}</p>
          </p>

          <div className='flex flex-row justify-end'>
            <Button
              type='custom'
              size='sm'
              className='text-blue-turquoise text-sm border border-blue-turquoise hover:bg-blue-100'
              href={button_link}
            >
              {button_text}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export function JobListCard({ title }) {
  const { data: jobs } = getJobs()

  return (
    <div className='relative border border-green-bright bg-white h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-4'>
      <h4 className='text-xl font-bold mb-3'>{title}</h4>

      <div className='px-3'>
        {jobs?.map((job, index) => (
          <Link
            key={index}
            href={`/dashboard/jobs/${job.slug}`}
            className='text-sm text-blue-sky'
          >
            <p className='mb-2'>{job.title.rendered}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function SpeakerCard({ id }) {
  const { data: speaker } = getSpeaker(id)

  return (
    <div className='flex flex-col items-center'>
      <Image
        src={speaker?.acf?.photo}
        width={164}
        height={164}
        className='mb-6'
      />

      <h4 className='text-lg font-bold flex items-center mb-1'>
        {speaker?.title?.rendered}
        {speaker?.acf?.role && (
          <div className='inline-flex items-center'>
            <span style={{ fontSize: '6px' }} className='mx-2 text-gray-500'>
              &#x2B24;
            </span>
            {speaker?.acf?.role}
          </div>
        )}
      </h4>

      <p className='text-sm mb-1'>{speaker?.acf?.position}</p>
      <p className='text-sm mb-1'>{speaker?.acf?.organization}</p>
      <p className='text-sm mb-1'>{speaker?.acf?.program}</p>

      <Popover className='relative'>
        <Popover.Button
          className={classNames(
            'flex items-center font-bold text-sm mt-3',
            speaker?.acf?.bio === '' && 'text-gray-400'
          )}
        >
          <Image
            src='/icons/bio.svg'
            width={24}
            height={24}
            className={classNames(
              'mr-1',
              speaker?.acf?.bio === '' && 'opacity-40'
            )}
          />
          <span>View Bio</span>
        </Popover.Button>

        <Transition>
          <Popover.Panel className='absolute bottom-1/2 left-full bg-white z-10 shadow-xl w-60 rounded-lg'>
            <div className='p-4 rounded'>{speaker?.acf?.bio}</div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export function DashboardRightCard({ postId }) {
  const { data: post } = getPost(postId)
  const { data: media } = getMedia(post?.featured_media)

  return (
    <div className='relative w-full'>
      <Link href={`/blog/${post?.slug}`}>
        <div className='flex flex-col-reverse md:flex-row md:justify-between gap-8'>
          <div className='p-0'>
            <h3 className='text-lg font-bold mt-4 mb-4'>
              {unEntry(post?.title?.rendered || '')}
            </h3>
          </div>

          <div className='md:w-36 h-36 relative flex-shrink-0'>
            <Image
              src={media?.source_url || '/images/blur.png'}
              fill={true}
              cover={true}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export function PartnerCard({ postId }) {
  const { data: post } = getPost(postId)

  return (
    <Link href={`/posts/${post?.slug}`}>
      <h3 className='text-lg font-bold line-clamp-3 mb-4'>
        {post?.title?.rendered}
      </h3>

      <div className='flex gap-3'>
        <p className='text-xs text-gray-500 mb-2'>
          {dateFormat(post?.date, 'mmm d, yyyy')}
        </p>

        <p className='text-xs text-gray-500 mb-2'>
          • {post?.acf?.partner?.name}
        </p>
      </div>
    </Link>
  )
}
