import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/atoms/Button'
import styles from './TOCNav.module.scss'

export default function TOCNav({ toc_items }) {
  const [active, setActive] = useState()

  useEffect(() => {
    window.addEventListener('scroll', (e) => debounce(handleScroll(e), 1000))
    return function cleanupListener() {
      window.removeEventListener('scroll', (e) => handleScroll(e))
    }
  }, [])

  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const handleScroll = () => {
    let itemInView = false
    toc_items.map((toc) => {
      const el = document.getElementById(toc.id)
      if (el) {
        if (isElementVisible(el)) {
          if (!itemInView) {
            itemInView = true
            setActive(toc.id)
          }
        }
      }
    })

    function isElementVisible(el) {
      if (el) {
        const rect = el.getBoundingClientRect()
        const vWidth = window.innerWidth || document.documentElement.clientWidth
        const vHeight =
          window.innerHeight || document.documentElement.clientHeight
        const efp = (x, y) => {
          return document.elementFromPoint(x, y)
        }

        if (
          rect.right < 0 ||
          rect.bottom < 0 ||
          rect.left > vWidth ||
          rect.top > vHeight
        )
          return false

        return (
          el.contains(efp(rect.left, rect.top)) ||
          el.contains(efp(rect.right, rect.top))
        )
      }

      return false
    }
  }

  const navigateTo = (id) => {
    const el = window.document.getElementById(id)
    if (el) {
      const r = el.getBoundingClientRect()
      window.scrollTo({
        top: scrollY + r.top - 150,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={styles.root} aria-label='Table of Contents'>
      <ul>
        {toc_items?.length > 0 ? (
          toc_items.map(({ label, id }) => (
            <li key={label} className={active == id ? styles.active : ''}>
              <Button
                onClick={() => navigateTo(id)}
                type='tertiary'
                className='text-left'
                style={{ maxWidth: '220px' }}
              >
                {label}
              </Button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

TOCNav.propTypes = {
  toc_items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
}
