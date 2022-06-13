import React from 'react'
import classnames from 'classnames'
import { useCarousel } from './useCarousel'
import styles from './ArrowCarousel.module.scss'
import Image from '@/components/atoms/Image'

const Carousel = (props) => {
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
        <Image
          src='/icons/arrow-left-circle-black.svg'
          width={30}
          height={30}
        />
      </li>

      <li
        className={classnames(
          styles.arrow,
          currentPage === lastPage && styles.disabled
        )}
        onClick={onNext}
      >
        <Image
          src='/icons/arrow-right-circle-black.svg'
          width={30}
          height={30}
        />
      </li>
    </ul>
  )
}

export default Carousel
