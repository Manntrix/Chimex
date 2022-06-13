import { useState } from 'react'
import Image from '@/components/atoms/Image'
import {
  CustomDashboardCard,
  DashboardRightCard,
  EventDashboardCard,
  JobListCard,
  VerticalCard,
} from '@/components/molecules/Card'
import ArrowCarousel from '@/components/molecules/ArrowCarousel'
import styles from './CardCarousel.module.scss'
import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import DashboardCarousel from '@/components/molecules/DashboardCarousel'
import numRange from '@/functions/numRange'

export default function CardCarousel({
  title,
  subtitle,
  links,
  card_type,
  media,
  events,
  cards,
}) {
  const [page, setPage] = useState(1)

  return (
    <div
      className='overflow-hidden relative'
      style={{
        background:
          card_type === 'post'
            ? 'linear-gradient(180deg, rgba(137, 187, 223, 0) 0%, rgba(43, 135, 200, 0.12) 100%)'
            : 'transparent',
      }}
    >
      <Section>
        {card_type === 'post' && (
          <div className='absolute left-0 top-0 -z-10'>
            <Image
              src='/images/top-contents-shape.svg'
              width={610}
              height={590}
            />
          </div>
        )}

        <div className='py-8'>
          <div className='flex flex-col md:flex-row justify-between mb-1'>
            <h4 className='text-gray-600 font-bold text-sm'>{title}</h4>

            <div className='flex gap-3'>
              {links &&
                links?.map((link, index) => (
                  <Link
                    key={index}
                    href={link.link}
                    className='text-blue-sky text-sm md:mx-3 hover:underline'
                  >
                    {link.text}
                  </Link>
                ))}
            </div>
          </div>

          <p className='text-gray-600 text-xs mb-3'>{subtitle}</p>

          {card_type === 'post' && (
            <>
              <div
                className='hidden md:flex flex-row gap-8 ease-in-out transition duration-200 mb-12'
                style={{
                  transform: `translateX(calc(-${25 * (page - 1)}% - ${
                    8 * (page - 1)
                  }px))`,
                }}
              >
                {media?.map((post, index) => (
                  <div key={index} className={styles.carouselCard}>
                    <VerticalCard
                      postId={post.post}
                      background={
                        index % 3 === 0
                          ? 'white'
                          : index % 3 === 1
                          ? 'image'
                          : 'blue'
                      }
                    />
                  </div>
                ))}
              </div>

              <div
                className='flex md:hidden flex-row gap-8 ease-in-out transition duration-200 mb-12'
                style={{
                  transform: `translateX(calc(-${100 * (page - 1)}% - ${
                    32 * (page - 1)
                  }px))`,
                }}
              >
                {media?.map((post, index) => (
                  <div key={index} className={styles.carouselCard}>
                    <VerticalCard
                      postId={post.post}
                      ctaLink={post.custom_cta}
                      ctaText={post.cta_text}
                      background={
                        index % 3 === 0
                          ? 'white'
                          : index % 3 === 1
                          ? 'image'
                          : 'blue'
                      }
                    />
                  </div>
                ))}
              </div>

              <div className='flex justify-start'>
                <div className=''>
                  <ArrowCarousel
                    currentPage={page}
                    totalCount={
                      card_type === 'post'
                        ? media?.length
                        : card_type === 'event'
                        ? events.length
                        : cards.length
                    }
                    pageSize={1}
                    onPageChange={(page) => setPage(page)}
                  />
                </div>
              </div>
            </>
          )}

          {card_type === 'post_group' && (
            <div className='overflow-hidden'>
              <div
                className='hidden md:flex flex-row gap-8 ease-in-out transition duration-200 mb-12'
                style={{
                  transform: `translateX(calc(-${100 * (page - 1)}% - ${
                    32 * (page - 1)
                  }px))`,
                }}
              >
                {numRange(0, parseInt(media?.length / 4)).map((num) => (
                  <div
                    key={num}
                    className='grid grid-cols-2 gap-8 w-full flex-shrink-0'
                  >
                    {media?.slice(num * 4, (num + 1) * 4).map((post, index) => (
                      <div key={index}>
                        <DashboardRightCard postId={post.post} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div
                className='flex md:hidden flex-row gap-8 ease-in-out transition duration-200 mb-12'
                style={{
                  transform: `translateX(calc(-${100 * (page - 1)}% - ${
                    32 * (page - 1)
                  }px))`,
                }}
              >
                {numRange(0, parseInt(media?.length / 4)).map((num) => (
                  <div
                    key={num}
                    className='grid grid-cols-2 gap-8 w-full flex-shrink-0'
                  >
                    {media?.slice(num * 4, (num + 1) * 4).map((post, index) => (
                      <div key={index}>
                        <DashboardRightCard postId={post.post} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className='flex justify-end'>
                <div className=''>
                  <DashboardCarousel
                    currentPage={page}
                    totalCount={media?.length}
                    pageSize={4}
                    onPageChange={(page) => setPage(page)}
                  />
                </div>
              </div>
            </div>
          )}

          {card_type === 'event' && (
            <>
              <div
                className='hidden md:flex flex-row gap-8 ease-in-out transition duration-200 mb-3'
                style={{
                  transform: `translateX(calc(-${33.33 * (page - 1)}% - ${
                    8 * (page - 1)
                  }px))`,
                }}
              >
                {events?.map((event, index) => (
                  <div key={index} className={styles.carouselCardEvent}>
                    <EventDashboardCard eventId={event.event} />
                  </div>
                ))}
              </div>

              <div className='flex justify-end'>
                <div className=''>
                  <ArrowCarousel
                    currentPage={page}
                    totalCount={
                      card_type === 'post'
                        ? media?.length
                        : card_type === 'event'
                        ? events.length
                        : cards.length
                    }
                    pageSize={1}
                    onPageChange={(page) => setPage(page)}
                  />
                </div>
              </div>
            </>
          )}

          {card_type === 'job' && (
            <>
              <div
                className='hidden md:flex flex-row gap-8 ease-in-out transition duration-200 mb-3'
                style={{
                  transform: `translateX(calc(-${33.33 * (page - 1)}% - ${
                    8 * (page - 1)
                  }px))`,
                }}
              >
                <div className={styles.carouselCardEvent}>
                  <JobListCard title='Featured Jobs' />
                </div>

                <div className={styles.carouselCardEvent}>
                  <JobListCard title='Latest Jobs' />
                </div>

                <div className={styles.carouselCardEvent}>
                  <CustomDashboardCard
                    title='View Available Job Opportunities'
                    is_cta={true}
                    button_link='/dashboard/jobs'
                    background_type='dark'
                  />
                </div>
              </div>

              {cards?.length > 3 && (
                <div className='flex justify-end'>
                  <div className=''>
                    <DashboardCarousel
                      currentPage={page}
                      totalCount={cards.length}
                      pageSize={1}
                      onPageChange={(page) => setPage(page)}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {card_type === 'custom' && (
            <>
              <div
                className='hidden md:flex flex-row gap-8 ease-in-out transition duration-200 mb-3'
                style={{
                  transform: `translateX(calc(-${33.33 * (page - 1)}% - ${
                    8 * (page - 1)
                  }px))`,
                }}
              >
                {cards?.map((card, index) => (
                  <div key={index} className={styles.carouselCardEvent}>
                    <CustomDashboardCard {...card} />
                  </div>
                ))}
              </div>

              {cards?.length > 3 && (
                <div className='flex justify-end'>
                  <div className=''>
                    <DashboardCarousel
                      currentPage={page}
                      totalCount={cards.length}
                      pageSize={1}
                      onPageChange={(page) => setPage(page)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Section>
    </div>
  )
}
