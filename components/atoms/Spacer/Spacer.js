import PropTypes from 'prop-types'

export default function Spacer({ height }) {
  return <div className={`block h-${height}`}></div>
}

Spacer.propTypes = {
  height: PropTypes.number,
}

Spacer.defaultProps = {
  height: 1,
}
