import unEntry from '@/functions/unEntry'
import PropTypes from 'prop-types'

export default function Type({ tag, type }) {
  if (type === 'blue') {
    return (
      <div className='rounded px-2 text-2xs font-semibold bg-blue-sea text-white border'>
        {unEntry(tag.name)}
      </div>
    )
  }

  if (type === 'green') {
    return (
      <div className='rounded px-2 text-2xs font-semibold bg-green-tea text-black border border-green-tea'>
        {unEntry(tag.name)}
      </div>
    )
  }

  if (type === 'sky') {
    return (
      <div className='rounded px-2 text-2xs font-semibold bg-blue-sky text-white border'>
        {unEntry(tag.name)}
      </div>
    )
  }

  return (
    <div className='rounded px-2 text-2xs font-semibold text-white border border-white'>
      {unEntry(tag.name)}
    </div>
  )
}

Type.propTypes = {
  tag: PropTypes.object,
  type: PropTypes.oneOf(['white', 'blue', 'green', 'sky']),
}

Type.defaultProps = {
  type: 'white',
}
