import PropTypes from 'prop-types'
import styles from './Section.module.scss'

export default function Section({ children, className }) {
  return (
    <div className={className}>
      <div className={styles.root}>
        <div className={styles.wrap}>{children}</div>
      </div>
    </div>
  )
}

Section.propTypes = {
  children: PropTypes.any.isRequired,
}
