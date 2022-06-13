import React from 'react'
import classnames from 'classnames'
import { useCarousel, DOTS } from './useCarousel'
import styles from './DashboardCarousel.module.scss'
import Image from '@/components/atoms/Image'

const DashboardCarousel = (props) => {
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

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = CarouselRange[CarouselRange.length - 1]

  return (
    <ul className={classnames(styles.container, { [className]: className })}>
      <li
        className={classnames(
          styles.arrow,
          currentPage === 1 && styles.disabled
        )}
        onClick={onPrevious}
      >
        <Image src={'/icons/arrow-left-small.svg'} width={10} height={10} />

        <span>previous</span>
      </li>

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

      <li
        className={classnames(
          styles.arrow,
          currentPage === lastPage && styles.disabled
        )}
        onClick={onNext}
      >
        <span>next</span>

        <Image src={'/icons/arrow-right-small.svg'} width={10} height={10} />
      </li>
    </ul>
  )
}

export default DashboardCarousel
