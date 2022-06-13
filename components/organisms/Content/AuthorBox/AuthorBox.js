import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function AuthorBox({ author }) {
  return (
    <div className='p-5 bg-gray-100 my-12'>
      <div className='flex flex-row items-center gap-8'>
        <div className='rounded-full border-2 border-green-bright overflow-hidden'>
          <Image
            src={author?.simple_local_avatar?.full}
            width={64}
            height={64}
          />
        </div>

        <div>
          <h4 className='text-lg font-bold mb-2'>{author?.name}</h4>

          <p className='text-sm mb-2'>{author?.description}</p>

          <Link
            href={`/author/${author?.slug}`}
            className='text-sm font-bold underline'
          >{`See ${author?.name}'s posts`}</Link>
        </div>
      </div>
    </div>
  )
}
