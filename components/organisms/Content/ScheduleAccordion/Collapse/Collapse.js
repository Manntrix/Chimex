import { useState } from 'react'
import Image from '@/components/atoms/Image'
import RichText from '@/components/organisms/Content/RichText'

export default function Collapse({ title, content, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className='mb-1'>
      <div
        className='flex gap-2 justify-between items-center my-2 cursor-pointer bg-blue-50 p-2'
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className='text-lg font-bold'>{title}</h3>

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

      {expanded && <RichText>{content}</RichText>}
    </div>
  )
}
