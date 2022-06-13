import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from './usePagination'
import styles from './Pagination.module.scss'
import Image from '@/components/atoms/Image'

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
      <ul className={classnames(styles.container, { [className]: className })}>
        <li
          className={classnames(
            styles.arrow,
            currentPage === 1 && styles.disabled
          )}
          onClick={onPrevious}
        >
          <Image src={'/icons/arrow-left-gray.svg'} width={15} height={15} />

          <span>Previous</span>
        </li>

        <div className='flex'>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <li
                  className={classnames(styles.item, styles.dots)}
                  key={index}
                >
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
                {pageNumber}
              </li>
            )
          })}
        </div>

        <li
          className={classnames(
            styles.arrow,
            currentPage === lastPage && styles.disabled
          )}
          onClick={onNext}
        >
          <span>Next</span>

          <Image src={'/icons/arrow-right-gray.svg'} width={15} height={15} />
        </li>
      </ul>
    </div>
  )
}

export default Pagination
