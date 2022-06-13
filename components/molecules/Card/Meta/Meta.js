import dateFormat from 'dateformat'
import { InformationCircleIcon, MinusSmIcon } from '@heroicons/react/solid'
import cn from 'classnames'

export default function Meta({ author, publishedAt, className }) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-4 text-xs font-bold justify-end',
        className
      )}
    >
      <div className='flex flex-row items-center'>
        <InformationCircleIcon className='w-4 h-4 mr-1' />

        <span>{author?.fields?.name}</span>
      </div>

      <div className='flex flex-row items-center uppercase'>
        <MinusSmIcon className='w-4 h-4' />

        <span>{dateFormat(publishedAt, 'mmm d, yyyy')}</span>
      </div>
    </div>
  )
}
