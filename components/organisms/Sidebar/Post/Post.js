import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import getMedia from '@/functions/fetch/wordpress/getMedia'
import getPost from '@/functions/fetch/wordpress/getPost'
import getTags from '@/functions/fetch/wordpress/getTags'
import unEntry from '@/functions/unEntry'

export default function Post({ id }) {
  const { data: post } = getPost(id)
  const { data: media } = getMedia(post?.featured_media)
  const { data: tags } = getTags(id)

  return (
    <div className='relative mb-12'>
      <Link href={`/posts/${post?.slug}`}>
        <div className='w-full h-40 relative mb-4'>
          <Image
            src={media?.source_url || '/images/blur.png'}
            fill={true}
            cover={true}
          />
        </div>

        <p className='text-xs text-gray-500 mb-2'>
          {tags?.length > 0 && unEntry(tags[0].name)}
        </p>

        <h3 className='text-lg font-bold line-clamp-3 mb-4'>
          {post?.title?.rendered}
        </h3>
      </Link>
    </div>
  )
}
