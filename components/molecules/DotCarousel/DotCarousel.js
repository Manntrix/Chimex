import React from 'react'
import classnames from 'classnames'
import { useCarousel, DOTS } from './useCarousel'
import styles from './DotCarousel.module.scss'

const DotCarousel = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const CarouselRange = useCarousel({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || CarouselRange.length < 2) {
    return null
  }

  return (
    <ul className={classnames(styles.container, { [className]: className })}>
      {CarouselRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className={classnames(styles.item, styles.dots)} key={index}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={classnames(
              styles.item,
              pageNumber === currentPage && styles.selected
            )}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            &#x2B24;
          </li>
        )
      })}
    </ul>
  )
}

export default DotCarousel
