import getSettings from '@/functions/fetch/wordpress/getSettings'
import { XCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Ad from '../../Content/Ad'

export default function Pushdown() {
  const { data: settings } = getSettings()
  const [show, setShow] = useState(true)

  return (
    <>
      {show && (
        <div className='relative bg-blue-deep px-4 py-16 md:py-12 flex items-center justify-center'>
          {settings && <Ad {...settings?.acf?.pushdown_banner_ad} />}

          <div className='absolute top-4 right-4'>
            <XCircleIcon
              width={30}
              height={30}
              color='white'
              className='cursor-pointer'
              onClick={() => setShow(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}
