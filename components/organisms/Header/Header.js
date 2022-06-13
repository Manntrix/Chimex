import { Popover } from '@headlessui/react'
import Logo from '@/components/molecules/Logo'
import Transition from '@/components/atoms/Transition'
import Search from '../../molecules/Search'
import OpenIcon from './OpenIcon'
import CloseIcon from './CloseIcon'
import Link from '@/components/atoms/Link'
import Menu from './Menu'
import Image from '@/components/atoms/Image'
import Social from '@/components/molecules/Social'
import Account from './Account'
import getMenu from '@/functions/fetch/wordpress/getMenu'
import unEntry from '@/functions/unEntry'
import headlessURL from '@/functions/headlessURL'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import SignInForm from '../SignInForm'
import Pushdown from './Pushdown'
import Announcement from './Announcement'
import OffCanvas from './OffCanvas'

export default function Header({ version = 'black', pushdown }) {
  const { data: session, status } = useSession()

  const { data: menu } = getMenu('main-menu')
  const { data: account } = getMenu('login-menu')

  const [showSignin, setShowSignin] = useState(false)

  if (version === 'white') {
    return (
      <>
        <Popover className='relative shadow-sm z-10'>
          {pushdown && <Pushdown />}

          <div className=''>
            <div className='flex justify-between items-center px-2 md:px-8 py-2 bg-blue-deep'>
              <div className='flex items-center gap-4 lg:gap-8'>
                <OffCanvas />

                <OpenIcon />

                <Social />

                <Announcement />
              </div>

              <div className='flex items-center space-x-4 md:space-x-8'>
                {session && status === 'authenticated' ? (
                  <>{account && <Account items={account.items} />}</>
                ) : (
                  <button
                    id='loginBtn'
                    onClick={() => setShowSignin(true)}
                    className='group text-white text-sm inline-flex items-center border border-white border-opacity-50 rounded-full px-4 py-1 realtive'
                  >
                    <Image
                      src='/icons/account-white.svg'
                      width={16}
                      height={16}
                      className='mr-1'
                    />
                    <span>Login</span>
                  </button>
                )}

                <Link href='/event/calendar'>
                  <Image src='/icons/calendar.svg' width={24} height={24} />
                </Link>
              </div>
            </div>

            <div
              className='flex justify-between items-center xl:justify-start md:space-x-10 lg:space-x-10 2xl:space-x-16 px-2 lg:px-10 py-4 z-20'
              style={{
                background:
                  'linear-gradient(180deg, #0A1E42 19.79%, rgba(16, 24, 39, 0) 100%)',
              }}
            >
              <Logo version='white' />

              {menu?.items?.map((menu, index) => (
                <Menu key={index} menu={menu} version='white' />
              ))}

              <div className='hidden lg:flex items-center justify-end lg:flex-1 xl:w-0'>
                <Search version='white' />
              </div>
            </div>
          </div>

          <Transition>
            <Popover.Panel
              focus
              className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right xl:hidden z-10'
            >
              <div className='rounded-lg shadow-lg ring-0 bg-blue-sea divide-y-2 divide-gray-50'>
                <div className='pt-5 pb-6 px-5'>
                  <div className='flex items-center justify-between'>
                    <Logo />

                    <CloseIcon />
                  </div>

                  {menu?.items.map((menu, index) => (
                    <div key={index} className='mt-6'>
                      <nav className='grid gap-y-2'>
                        <Link
                          href={headlessURL(menu.url)}
                          className='px-3 py-1 flex items-start rounded-lg text-white'
                        >
                          <p className='text-sm'>{unEntry(menu.title)}</p>
                        </Link>

                        {menu.child_items?.map((sub_menu) => (
                          <div key={sub_menu.title} className='pl-3'>
                            <Link
                              href={headlessURL(sub_menu.url)}
                              className='px-3 py-1 flex items-start rounded-lg text-white'
                            >
                              <p className='text-sm'>
                                {unEntry(sub_menu.title)}
                              </p>
                            </Link>

                            {sub_menu.child_items?.map((child_menu) => (
                              <Link
                                key={child_menu.title}
                                href={headlessURL(child_menu.url)}
                                className='px-3 py-1 flex items-start rounded-lg text-white'
                              >
                                <p className='text-sm ml-3'>
                                  {unEntry(child_menu.title)}
                                </p>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>

                <div className='py-6 px-5 space-y-6'>
                  <div className='items-center justify-end lg:flex-1 xl:w-0'>
                    <Search />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {showSignin && (
          <div className='fixed z-50 top-0 left-0 w-full h-full bg-blue-deep bg-opacity-60 flex justify-center items-center'>
            <SignInForm setShowSignin={setShowSignin} />
          </div>
        )}
      </>
    )
  }

  if (version === 'black') {
    return (
      <>
        <Popover className='relative shadow-sm z-10'>
          <div className=''>
            <div className='flex justify-between items-center px-2 md:px-8 py-2 bg-blue-deep'>
              <div className='flex items-center gap-4 lg:gap-8'>
                <OffCanvas />

                <OpenIcon />

                <Social />

                <Announcement />
              </div>

              <div className='flex items-center space-x-4 md:space-x-8'>
                {session && status === 'authenticated' ? (
                  <>{account && <Account items={account.items} />}</>
                ) : (
                  <button
                    id='loginBtn'
                    onClick={() => setShowSignin(true)}
                    className='group text-white text-sm inline-flex items-center border border-white border-opacity-50 rounded-full px-4 py-1 realtive'
                  >
                    <Image
                      src='/icons/account-white.svg'
                      width={16}
                      height={16}
                      className='mr-1'
                    />
                    <span>Login</span>
                  </button>
                )}

                <Link href='/event/calendar'>
                  <Image src='/icons/calendar.svg' width={24} height={24} />
                </Link>
              </div>
            </div>

            <div
              className='flex justify-between items-center xl:justify-start md:space-x-10 lg:space-x-10 2xl:space-x-16 px-2 lg:px-10 py-4 z-20'
              style={{
                background: 'white',
              }}
            >
              <Logo version='black' />

              {menu?.items?.map((menu, index) => (
                <Menu key={index} menu={menu} version='black' />
              ))}

              <div className='hidden lg:flex items-center justify-end lg:flex-1 xl:w-0'>
                <Search version='black' />
              </div>
            </div>
          </div>

          <Transition>
            <Popover.Panel
              focus
              className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right xl:hidden z-10'
            >
              <div className='rounded-lg shadow-lg ring-0 bg-blue-sea divide-y-2 divide-gray-50'>
                <div className='pt-5 pb-6 px-5'>
                  <div className='flex items-center justify-between'>
                    <Logo />

                    <CloseIcon />
                  </div>

                  {menu?.items.map((menu, index) => (
                    <div key={index} className='mt-6'>
                      <nav className='grid gap-y-2'>
                        <Link
                          href={headlessURL(menu.url)}
                          className='px-3 py-1 flex items-start rounded-lg text-white'
                        >
                          <p className='text-sm'>{unEntry(menu.title)}</p>
                        </Link>

                        {menu.child_items?.map((sub_menu) => (
                          <div key={sub_menu.title} className='pl-3'>
                            <Link
                              href={headlessURL(sub_menu.url)}
                              className='px-3 py-1 flex items-start rounded-lg text-white'
                            >
                              <p className='text-sm'>
                                {unEntry(sub_menu.title)}
                              </p>
                            </Link>

                            {sub_menu.child_items?.map((child_menu) => (
                              <Link
                                key={child_menu.title}
                                href={headlessURL(child_menu.url)}
                                className='px-3 py-1 flex items-start rounded-lg text-white'
                              >
                                <p className='text-sm ml-3'>
                                  {unEntry(child_menu.title)}
                                </p>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>

                <div className='py-6 px-5 space-y-6'>
                  <div className='items-center justify-end lg:flex-1 xl:w-0'>
                    <Search />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {showSignin && (
          <div className='fixed z-50 top-0 left-0 w-full h-full bg-blue-deep bg-opacity-60 flex justify-center items-center'>
            <SignInForm setShowSignin={setShowSignin} />
          </div>
        )}
      </>
    )
  }

  return <></>
}
