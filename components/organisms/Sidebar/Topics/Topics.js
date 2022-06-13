import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import unEntry from '@/functions/unEntry'

export default function Topics({ title, topics }) {
  return (
    <>
      <h3 className='text-black text-opacity-60 text-lg font-bold uppercase my-4'>
        {title}
      </h3>

      {topics.map((topic, index) => (
        <Link
          key={index}
          href={`/blog/category/${topic.slug}`}
          className='font-bold flex flex-row justify-between items-center border-b py-1.5 mb-1 hover:border-black hover:bg-zinc-100'
        >
          {unEntry(topic.name)}

          <Image
            src='/icons/arrow-right-small-black.svg'
            width={7}
            height={12}
          />
        </Link>
      ))}
    </>
  )
}
