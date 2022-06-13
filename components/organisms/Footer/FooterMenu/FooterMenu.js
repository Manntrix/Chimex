import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import getMenu from '@/functions/fetch/wordpress/getMenu'
import headlessURL from '@/functions/headlessURL'
import unEntry from '@/functions/unEntry'
import styles from './FooterMenu.module.scss'

export default function FooterMenu() {
  const { data: quick } = getMenu('footer-quick-links')
  const { data: events } = getMenu('footer-events')
  const { data: support } = getMenu('footer-support')
  const { data: education } = getMenu('footer-education')
  const { data: solutions } = getMenu('footer-solutions')
  const { data: membership } = getMenu('footer-membership')
  const { data: resources } = getMenu('footer-resources')
  const { data: about } = getMenu('footer-about')
  const { data: dashboard } = getMenu('dashboard')

  return (
    <div>
      <hr className='opacity-20 max-w-6xl mx-auto' />

      <Section className='py-8 md:py-16'>
        <div className={styles.root}>
          <div className={styles.menus}>
            {quick && events && support && (
              <div>
                {[quick, events, support].map((menu, index) => (
                  <div key={index} className={styles.menu}>
                    <h4 className={styles.heading}>
                      {unEntry(menu.name || '').replace('Footer - ', '')}
                    </h4>

                    {menu.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={headlessURL(item.url)}
                        className={styles.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {education && solutions && (
              <div>
                {[education, solutions].map((menu, index) => (
                  <div key={index} className={styles.menu}>
                    <h4 className={styles.heading}>
                      {unEntry(menu.name || '').replace('Footer - ', '')}
                    </h4>

                    {menu.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={headlessURL(item.url)}
                        className={styles.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {membership && resources && about && (
              <div>
                {[membership, resources, about].map((menu, index) => (
                  <div key={index} className={styles.menu}>
                    <h4 className={styles.heading}>
                      {unEntry(menu.name || '').replace('Footer - ', '')}
                    </h4>

                    {menu.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={headlessURL(item.url)}
                        className={styles.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.about}>
            <h4 className={styles.heading}>CHIME</h4>

            <p className={styles.text}>
              The College of Healthcare Information Management Executives
              (CHIME) is the professional organization for Chief Information
              Officers and other senior healthcare IT leaders.
            </p>

            <hr className='opacity-20 my-8' />

            <div className={styles.menu}>
              <h4 className={styles.heading}>{dashboard?.name}</h4>

              <div className='grid grid-cols-2'>
                <div>
                  {dashboard?.items?.slice(0, 6).map((item) => (
                    <Link
                      key={item.title}
                      href={headlessURL(item.url)}
                      className={styles.link}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div>
                  {dashboard?.items
                    ?.slice(6, dashboard?.items.length)
                    .map((item) => (
                      <Link
                        key={item.title}
                        href={headlessURL(item.url)}
                        className={styles.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <hr className='opacity-20 max-w-6xl mx-auto' />
    </div>
  )
}
