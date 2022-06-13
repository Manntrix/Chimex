import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Transition from '@/components/atoms/Transition'
import getMenu from '@/functions/fetch/wordpress/getMenu'
import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

export default function OffCanvas() {
  const { data: menu } = getMenu('ecosystem-menu')

  return (
    <div className='-mr-2 -my-2'>
      <Popover>
        <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-white'>
          <span className='sr-only'>Open menu</span>
          <MenuIcon className='h-8 w-8' aria-hidden='true' />
        </Popover.Button>

        <Transition>
          <Popover.Panel className='absolute top-0 left-0 h-screen w-80 bg-white z-50 py-4 overflow-y-auto'>
            <h2 className='text-xl font-bold mb-4 px-8'>The CHIME Ecosystem</h2>

            <hr />

            <div className='py-4'>
              {menu?.items?.length > 0 &&
                menu.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    urlExternal={item.target === '_blank' ? true : false}
                    className='block text-gray-600 text-sm py-2 hover:font-bold hover:bg-blue-100 hover:text-black px-8'
                  >
                    {item.title}
                  </Link>
                ))}
            </div>

            <hr />

            <div className='py-8'>
              <Link
                href='/memberships/register'
                className='text-gray-600 text-sm py-2 hover:font-bold hover:bg-blue-100 hover:text-black px-8 flex justify-between w-64 gap-2'
              >
                <p>Become a Member</p>
                <Image src='/icons/arrow-right.svg' width={18} height={18} />
              </Link>

              <Link
                href='/memberships/register'
                className='text-gray-600 text-sm py-2 hover:font-bold hover:bg-blue-100 hover:text-black px-8 flex justify-between w-64 gap-2'
              >
                <p>Join as an Organization</p>
                <Image src='/icons/arrow-right.svg' width={18} height={18} />
              </Link>

              <Link
                href='/memberships/register'
                className='text-gray-600 text-sm py-2 hover:font-bold hover:bg-blue-100 hover:text-black px-8 flex justify-between w-64 gap-2'
              >
                <p>Join as a Vendor</p>
                <Image src='/icons/arrow-right.svg' width={18} height={18} />
              </Link>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
