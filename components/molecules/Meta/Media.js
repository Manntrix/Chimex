import Image from '@/components/atoms/Image'
import getMedia from '@/functions/fetch/wordpress/getMedia'

export default function Media({ mediaId, cover = false }) {
  const { data: image } = getMedia(mediaId)

  return image ? (
    <div className='w-full h-full relative'>
      <Image src={image.source_url} fill={true} cover={cover} />
    </div>
  ) : (
    <></>
  )
}
