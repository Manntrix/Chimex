import { useState } from 'react'
import Section from '@/components/atoms/Section'
import { BlankCard, FeaturedCard, PostCard } from '@/components/molecules/Card'
import DotCarousel from '@/components/molecules/DotCarousel'
import classNames from 'classnames'
import Link from '@/components/atoms/Link'

export default function CustomPostsGrid({ left, center, right }) {
  const [page, setPage] = useState(1)

  return (
    <Section className='pb-8'>
      <div className='lg:grid lg:grid-cols-4 gap-4 mb-8'>
        <div className='col-span-1 mb-12 lg:mb-0'>
          <h4 className='text-gray-500 font-bold tracking-widest mb-8'>
            {left.title || <div className='h-6'></div>}
          </h4>

          {left?.posts?.map((post, index) => (
            <div
              key={index}
              className={classNames(
                'relative mb-4',
                index < left?.posts.length - 1 && 'border-b'
              )}
            >
              <BlankCard postId={post.post} />
            </div>
          ))}

          <Link href='/blog' className='underline text-sm font-bold'>
            {'View all >'}
          </Link>
        </div>

        <div className='lg:col-span-2 mb-12 lg:mb-0'>
          <h4 className='text-gray-500 font-bold tracking-widest mb-8'>
            {center.title || <div className='h-6'></div>}
          </h4>

          <div className='overflow-hidden w-full'>
            <div
              className='flex flex-row gap-6 ease-in-out transition duration-200'
              style={{
                width: `${100 * center?.posts?.length}%`,
                transform: `translateX(calc(-${
                  (100 / center?.posts?.length) * (page - 1)
                }% - ${6 * (page - 1)}px))`,
              }}
            >
              {center?.posts?.map((post, index) => (
                <FeaturedCard key={index} postId={post.post} />
              ))}
            </div>
          </div>

          <div className='flex justify-start'>
            <DotCarousel
              currentPage={page}
              totalCount={center?.posts?.length}
              pageSize={1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>

        <div className='col-span-1'>
          <h4 className='text-gray-500 font-bold tracking-widest mb-8'>
            {right.title || <div className='h-6'></div>}
          </h4>

          {right?.posts?.slice(0, 2).map((post, index) => (
            <div
              key={index}
              className={classNames('relative mb-8', index === 0 && 'border-b')}
            >
              <PostCard postId={post.post} />
            </div>
          ))}
        </div>
      </div>

      <hr />
    </Section>
  )
}
