import ReactPlayer from 'react-player'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function Widget({ type, video, audio, download, link }) {
  return (
    <>
      {type === 'video' && video && (
        <div className='w-full h-60 md:h-96 relative'>
          <div className='absolute left-0 top-0 w-full h-full'>
            <ReactPlayer
              url={video.file}
              controls={true}
              width='100%'
              height='100%'
              light={video.placeholder_image}
              playIcon={
                <Image src='/icons/play-white.svg' width={120} height={120} />
              }
            />
          </div>
        </div>
      )}

      {type === 'audio' && audio && (
        <>
          <div className='w-full h-16 mt-2'>
            <ReactPlayer
              url={audio.file}
              controls={true}
              width='100%'
              height='100%'
            />
          </div>
        </>
      )}

      {type === 'download' && download && (
        <>
          <div className='w-full bg-blue-deep text-white px-4 py-4 rounded flex justify-between items-center gap-4 mt-4'>
            <div>
              <h4 className='text-lg font-bold line-clamp-1'>
                {download.title}
              </h4>
              <p className='text-sm line-clamp-1'>{download.subtitle}</p>
            </div>

            <div className='w-5 flex-shrink-0'>
              <Link
                href={download.file}
                urlExternal={true}
                attributes={{ download: true }}
              >
                <Image src='/icons/download-white.svg' width={20} height={20} />
              </Link>
            </div>
          </div>
        </>
      )}

      {type === 'link' && link && (
        <>
          <div className='w-full bg-blue-deep text-white px-4 py-4 rounded flex justify-between items-center gap-4 mt-4'>
            <div>
              <h4 className='text-lg font-bold line-clamp-1'>{link.title}</h4>
              <p className='text-sm line-clamp-1'>{link.subtitle}</p>
            </div>

            <div className='w-5 flex-shrink-0'>
              <Link href={link.url} urlExternal={true}>
                <Image src='/icons/link-white.svg' width={20} height={20} />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
