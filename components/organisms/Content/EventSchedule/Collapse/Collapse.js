import { useState } from 'react'
import Image from '@/components/atoms/Image'
import classNames from 'classnames'

export default function Collapse({ schedule, times, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className='mb-1'>
      <div
        className='flex gap-2 justify-between items-center cursor-pointer bg-blue-50 p-4'
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className='text-lg font-bold'>{schedule}</h3>

        <Image
          src={
            expanded
              ? '/icons/minus-circle-dark.svg'
              : '/icons/plus-circle-dark.svg'
          }
          width={16}
          height={16}
        />
      </div>

      {expanded && (
        <div>
          <table className='table-fixed w-full border-collapse'>
            {times.map((time, index) => (
              <tr
                key={index}
                className={classNames(
                  'border-b',
                  index % 2 === 1 && 'bg-zinc-100'
                )}
              >
                <td className='px-4 py-2 w-2/5'>{time.time}</td>
                <td className='px-4 py-2 w-3/5'>{time.agenda}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}
