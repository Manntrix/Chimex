import React, { useState } from 'react'
import Image from '@/components/atoms/Image'
import cn from 'classnames'
import PropTypes from 'prop-types'

export default function Search({ version }) {
  const [active, setActive] = useState(false)

  return (
    <>
      {version === 'black' ? (
        <form
          action='/search'
          className='md:flex relative items-center bg-transparent'
        >
          <input
            type='search'
            name='q'
            className={cn(
              `border-black border-opacity-70 focus:border-opacity-100 rounded-md focus:border-black focus:ring-0 focus:outline-none w-full pl-4 pr-8 text-black bg-transparent placeholder:text-opacity-50 placeholder:text-grey-500 transition-all ease-in duration-200`,
              active
                ? 'xl:w-56 border'
                : `lg:w-0 lg:rounded-none lg:border-l-black lg:border-transparent lg:border-opacity-50`
            )}
            placeholder='Search'
          />

          <div
            onClick={() => setActive(!active)}
            className='absolute w-12 h-full top-0 right-0 flex justify-center items-center'
          >
            <Image
              src={`/icons/search-black.svg`}
              width={18}
              height={18}
              aria-hidden='true'
            />
          </div>
        </form>
      ) : (
        <form
          action='/search'
          className='md:flex relative items-center bg-transparent'
        >
          <input
            type='search'
            name='q'
            className={cn(
              `border-white border-opacity-70 focus:border-opacity-100 rounded-md focus:border-white focus:ring-0 focus:outline-none w-full pl-4 pr-8 text-white bg-transparent placeholder:text-opacity-50 placeholder:text-grey-400 transition-all ease-in duration-200`,
              active
                ? 'xl:w-56 border'
                : `lg:w-0 lg:rounded-none lg:border-l-white lg:border-transparent lg:border-opacity-50`
            )}
            placeholder='Search'
          />

          <div
            onClick={() => setActive(!active)}
            className='absolute w-12 h-full top-0 right-0 flex justify-center items-center'
          >
            <Image
              src={`/icons/search-white.svg`}
              width={18}
              height={18}
              aria-hidden='true'
            />
          </div>
        </form>
      )}
    </>
  )
}

Search.propTypes = {
  version: PropTypes.oneOf(['black', 'white']),
}

Search.defaultProps = {
  version: 'white',
}
