import { useState } from 'react'
import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import RichText from '@/components/organisms/Content/RichText'

export default function Collapse({
  subtitle,
  icon,
  title,
  content,
  defaultExpanded = false,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className='mb-8'>
      <p className='text-gray-500 font-semibold tracking-widest uppercase mb-2'>
        {subtitle}
      </p>

      <Divider width={2} />

      <div
        className='flex gap-2 justify-between items-center my-2 cursor-pointer'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='flex gap-2 items-center'>
          <Image src={icon} width={32} height={32} />

          <h3 className='text-3xl font-bold'>{title}</h3>
        </div>

        <Image
          src={
            expanded
              ? '/icons/minus-circle-dark.svg'
              : '/icons/plus-circle-dark.svg'
          }
          width={25}
          height={25}
        />
      </div>

      {expanded && <RichText>{content}</RichText>}
    </div>
  )
}
