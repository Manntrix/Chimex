import unEntry from '@/functions/unEntry'
import PropTypes from 'prop-types'
import headlessURL from '@/functions/headlessURL'
import Ad from '../../Content/Ad'
import Button from '@/components/atoms/Button'
import { Popover } from '@headlessui/react'
import Transition from '@/components/atoms/Transition'

export default function Menu({ menu, version }) {
  return (
    <>
      {version === 'black' ? (
        <Popover>
          <Popover.Button>
            <span
              className={`hidden xl:inline-flex font-bold text-black md:mt-5`}
            >
              {unEntry(menu.title)}
            </span>
          </Popover.Button>

          <Transition>
            <Popover.Panel className='absolute lg:left-1/2 lg:-translate-x-1/2 flex justify-center px-8 max-w-full'>
              <div
                className='shadow-lg px-12 py-8 mt-4 overflow-auto'
                style={{ background: '#ECF4FA' }}
              >
                <h3 className='text-blue-sky text-2xl font-bold mb-6'>
                  {unEntry(menu.title)}
                </h3>

                <div className='flex gap-16'>
                  <div>
                    <div className='flex gap-6 border-b-2 pb-8 mb-8'>
                      {menu.child_items.map((subMenu) => (
                        <div key={subMenu.title} className='w-48'>
                          <a
                            href={headlessURL(subMenu.url)}
                            className='block font-bold mb-5'
                          >
                            {unEntry(subMenu.title)}
                          </a>

                          {subMenu.child_items?.map((childMenu) => (
                            <a
                              key={childMenu.title}
                              href={headlessURL(childMenu.url)}
                              className='block text-sm mb-4'
                            >
                              {unEntry(childMenu.title)}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>

                    <h4 className='text-lg mb-6'>{menu.acf?.cta?.title}</h4>

                    <div className='flex gap-4'>
                      {menu.acf?.cta?.buttons?.length > 0 &&
                        menu.acf?.cta?.buttons?.map((button, index) => (
                          <Button
                            key={index}
                            href={button.button_link}
                            icon='/icons/arrow-right-white.svg'
                            type={index === 0 ? 'secondary' : 'primary'}
                          >
                            {button.button_text}
                          </Button>
                        ))}
                    </div>
                  </div>

                  {menu.acf?.ad?.image && (
                    <div className='w-72 h-80 relative hidden 2xl:inline-flex flex-shrink-0'>
                      <Ad {...menu.acf?.ad} />
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>

          <div></div>
        </Popover>
      ) : (
        <Popover>
          <Popover.Button>
            <span className={`hidden xl:inline-flex font-bold text-white mt-5`}>
              {unEntry(menu.title)}
            </span>
          </Popover.Button>

          <Transition>
            <Popover.Panel className='absolute lg:left-1/2 lg:-translate-x-1/2 flex justify-center px-8 max-w-full'>
              <div
                className='shadow-lg px-12 py-8 mt-4 overflow-auto'
                style={{ background: '#ECF4FA' }}
              >
                <h3 className='text-blue-sky text-2xl font-bold mb-6'>
                  {unEntry(menu.title)}
                </h3>

                <div className='flex gap-16'>
                  <div>
                    <div className='flex gap-6 border-b-2 pb-8 mb-8'>
                      {menu.child_items.map((subMenu) => (
                        <div key={subMenu.title} className='w-48'>
                          <a
                            href={headlessURL(subMenu.url)}
                            className='block font-bold mb-5'
                          >
                            {unEntry(subMenu.title)}
                          </a>

                          {subMenu.child_items?.map((childMenu) => (
                            <a
                              key={childMenu.title}
                              href={headlessURL(childMenu.url)}
                              className='block text-sm mb-4'
                            >
                              {unEntry(childMenu.title)}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>

                    <h4 className='text-lg mb-6'>{menu.acf?.cta?.title}</h4>

                    <div className='flex gap-4'>
                      {menu.acf?.cta?.buttons?.length > 0 &&
                        menu.acf?.cta?.buttons?.map((button, index) => (
                          <Button
                            key={index}
                            href={button.button_link}
                            icon='/icons/arrow-right-white.svg'
                            type={index === 0 ? 'secondary' : 'primary'}
                          >
                            {button.button_text}
                          </Button>
                        ))}
                    </div>
                  </div>

                  {menu.acf?.ad?.image && (
                    <div className='w-72 h-80 relative hidden 2xl:inline-flex flex-shrink-0'>
                      <Ad {...menu.acf?.ad} />
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>

          <div></div>
        </Popover>
      )}
    </>
  )
}

Menu.propTypes = {
  version: PropTypes.oneOf(['black', 'white']),
}

Menu.defaultProps = {
  version: 'white',
}
