import Link from '@/components/atoms/Link'
import unEntry from '@/functions/unEntry'

export default function Tags({ title, tags }) {
  return (
    <>
      <h3 className='text-black text-opacity-60 text-lg font-bold uppercase my-4'>
        {title}
      </h3>

      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='border border-l-4 border-l-blue-sky py-0.5 px-2 text-sm'
          >
            <Link href={`/blog/tag/${tag.slug}`} className='font-bold'>
              {unEntry(tag.name)}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
