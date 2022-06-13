import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

export default function OpenIcon() {
  return (
    <div className='-mr-2 -my-2 lg:hidden'>
      <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-white'>
        <span className='sr-only'>Open menu</span>
        <MenuIcon className='h-8 w-8' aria-hidden='true' />
      </Popover.Button>
    </div>
  )
}
