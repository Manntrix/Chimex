import PropTypes from 'prop-types'

export default function Grid({ column, children }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${column} gap-2 lg:gap-4`}
    >
      {children}
    </div>
  )
}

Grid.propTypes = {
  column: PropTypes.number,
  children: PropTypes.any.isRequired,
}
