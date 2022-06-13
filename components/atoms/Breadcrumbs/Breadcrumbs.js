import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from '../Link'

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className='flex mb-6'>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className='flex items-center'>
          {breadcrumb.link ? (
            <>
              <Link
                href={breadcrumb.link}
                className='mx-1 text-xs text-gray-200 hover:text-white hover:underline'
              >
                {breadcrumb.text}
              </Link>

              <ChevronRightIcon
                width={18}
                height={18}
                className='text-gray-200 mr-1'
              />
            </>
          ) : (
            <span className='text-xs text-white'>{breadcrumb.text}</span>
          )}
        </div>
      ))}
    </div>
  )
}
