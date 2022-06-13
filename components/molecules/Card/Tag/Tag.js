import unEntry from '@/functions/unEntry'
import PropTypes from 'prop-types'

export default function Tag({ tag, type }) {
  if (type === 'black') {
    return (
      <div className='rounded-full px-2 text-2xs font-semibold bg-black text-white'>
        {unEntry(tag.name)}
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className='text-2xs font-semibold text-gray-600'>
        {unEntry(tag.name)}
      </div>
    )
  }

  return (
    <div className='rounded-full px-2 text-2xs font-semibold bg-white text-black'>
      {unEntry(tag.name)}
    </div>
  )
}

Tag.propTypes = {
  tag: PropTypes.object,
  type: PropTypes.oneOf(['white', 'black', 'text']),
}

Tag.defaultProps = {
  type: 'white',
}
