import { useState } from 'react'
import getPageSiblings from '@/functions/fetch/wordpress/getPageSiblings'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import Link from '@/components/atoms/Link'
import cn from 'classnames'
import unEntry from '@/functions/unEntry'
import Divider from '@/components/atoms/Divider'

export default function PageSiblings({ slug, parentPage }) {
  const { data: siblings } = getPageSiblings(parentPage.id)

  const [expanded, setExpanded] = useState(true)

  return (
    <div className='mb-8'>
      <div
        className='flex justify-between cursor-pointer mb-4'
        onClick={() => setExpanded(!expanded)}
      >
        <span className='text-lg font-bold'>
          {unEntry(parentPage?.title?.rendered)}
        </span>

        {expanded ? (
          <ChevronUpIcon width={24} height={24} />
        ) : (
          <ChevronDownIcon width={24} height={24} />
        )}
      </div>

      {expanded && (
        <div className='my-4'>
          {siblings?.map((page, index) => (
            <Link
              key={index}
              href={`/${parentPage.slug}/${page.slug}`}
              className={cn(
                'block ml-3 px-3 py-2',
                slug === page.slug &&
                  'text-white bg-gradient-to-br from-blue-900 to-blue-dark'
              )}
            >
              {unEntry(page.title.rendered)}
            </Link>
          ))}
        </div>
      )}

      <Divider width={2} />
    </div>
  )
}
