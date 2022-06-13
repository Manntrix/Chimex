import { Popover } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

export default function CloseIcon() {
  return (
    <div className='-mr-2'>
      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
        <span className='sr-only'>Close menu</span>
        <XIcon className='h-6 w-6' aria-hidden='true' />
      </Popover.Button>
    </div>
  )
}
