import React, { useState } from 'react'
import cn from 'classnames'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import styles from './SideNav.module.scss'
import getMenu from '@/functions/fetch/wordpress/getMenu'
import Image from '@/components/atoms/Image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import headlessURL from '@/functions/headlessURL'
import Link from '@/components/atoms/Link'

export default function index() {
  const { data: menu } = getMenu('dashboard')

  const [expand, setExpand] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ])

  const [show, setShow] = useState(false)

  const setExpandValue = (props) => {
    let newArr = [...expand]
    newArr[props] = !newArr[props]
    setExpand(newArr)
  }

  return (
    <div className={styles.root}>
      <div aria-label='toggler' className={styles.toggle}>
        <button
          aria-label='open'
          onClick={() => setShow(true)}
          className={show ? styles.hide : undefined}
        >
          <MenuIcon width={24} height={24} />
        </button>

        <button
          aria-label='close'
          onClick={() => setShow(false)}
          className={!show && styles.hide}
        >
          <XIcon width={24} height={24} />
        </button>
      </div>

      <div className={cn(show && styles.collapse, styles.wrap)}>
        {menu?.items.map((menu, menuIndex) => (
          <div className={styles.menuWrap} key={menuIndex}>
            {menu.child_items?.length > 0 ? (
              <button
                onClick={() => setExpandValue(menuIndex)}
                className={styles.menu}
              >
                <span className={styles.menuText}>
                  <Image
                    src={menu.acf?.icon}
                    width={24}
                    height={24}
                    className={styles.menuIcon}
                  />
                  {menu.title}
                </span>

                <div
                  className={cn(
                    !expand[menuIndex] && styles.rotate,
                    styles.iconExpand
                  )}
                >
                  <ChevronDownIcon width={10} height={10} />
                </div>
              </button>
            ) : (
              <Link type='custom' href={menu.url} className={styles.menu}>
                <span className={styles.menuText}>
                  <Image
                    src={menu.thumbnail_src}
                    width={24}
                    height={24}
                    className={styles.menuIcon}
                  />
                  {menu.title}
                </span>
              </Link>
            )}

            <div
              className={cn(
                !expand[menuIndex] && styles.hide,
                styles.subMenuWrap
              )}
            >
              {menu.child_items?.map((subMenu, subMenuIndex) => (
                <Link
                  href={headlessURL(subMenu.url)}
                  key={subMenuIndex}
                  className={styles.subMenu}
                >
                  {subMenu.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
