import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import PropTypes from 'prop-types'

export default function Logo({ version }) {
  return (
    <div className='w-64 flex justify-start items-center'>
      <Link href='/'>
        <span className='sr-only'>CHIME</span>
        {version === 'white' ? (
          <Image
            src={`/images/logo-white.svg`}
            width={264}
            height={47}
            alt='CHIME'
          />
        ) : (
          <Image
            src={`/images/logo-black.svg`}
            width={264}
            height={47}
            alt='CHIME'
          />
        )}
      </Link>
    </div>
  )
}

Logo.propTypes = {
  version: PropTypes.oneOf(['black', 'white']),
}

Logo.defaultProps = {
  version: 'white',
}
