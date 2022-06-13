import Transition from '@/components/atoms/Transition'
import headlessURL from '@/functions/headlessURL'
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'

export default function Account({ items }) {
  return (
    <Popover className='relative'>
      {() => (
        <>
          <Popover.Button
            className={
              'group text-white text-sm inline-flex items-center border border-white border-opacity-50 rounded-full px-4 py-1'
            }
          >
            <span>My Account</span>

            <ChevronDownIcon className={'ml-1 h-5 w-5'} aria-hidden='true' />
          </Popover.Button>

          <Transition>
            <Popover.Panel
              className={
                'absolute z-50 mt-3 transform px-2 w-48 sm:px-0 left-32 -translate-x-full'
              }
            >
              <div className='rounded-lg shadow-lg overflow-hidden'>
                <div className={'relative grid gap-2 bg-white px-3 py-4'}>
                  {items?.map((item) => (
                    <a
                      key={item.title}
                      href={headlessURL(item.url)}
                      className='p-2 hover:bg-gray-100 hover:text-blue-sky'
                    >
                      <p className='text-sm'>{item.title}</p>
                    </a>
                  ))}
                  <button
                    type='custom'
                    onClick={signOut}
                    className='p-2 hover:bg-gray-100 hover:text-blue-sky text-left text-sm'
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
