import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import getSpeaker from '@/functions/fetch/wordpress/getSpeaker'

export default function Speaker({ id }) {
  const { data: speaker } = getSpeaker(id)

  return (
    <div className='bg-gray-100 px-3 py-5 mb-3 relative'>
      {/* <div className='absolute right-6 top-6'>
        <Link
          href={`mailto:${speaker?.acf?.email}`}
          className='flex text-sm font-bold'
        >
          <Image src='/icons/email.svg' width={20} height={16} />
        </Link>
      </div> */}

      <div className='relative w-16 h-16 mb-4'>
        <Image src={speaker?.acf?.photo} width={64} height={64} />
      </div>

      <p className='font-bold mb-2'>{speaker?.title?.rendered}</p>

      <p className='text-sm mb-1'>{speaker?.acf?.position}</p>
      <p className='text-sm mb-4'>{speaker?.acf?.location}</p>

      <div className='flex gap-2'>
        <Link
          href={speaker?.acf?.twitter}
          className='flex text-sm font-bold'
          urlExternal={true}
        >
          <Image src='/icons/twitter-blue.svg' width={24} height={24} />
        </Link>

        <Link
          href={speaker?.acf?.linkedin}
          className='flex text-sm font-bold'
          urlExternal={true}
        >
          <Image src='/icons/linkedin-blue.svg' width={24} height={24} />
        </Link>
      </div>

      {/* <Link
        href={`tel:${speaker?.acf?.phone}`}
        className='flex text-sm font-bold'
      >
        <Image src='/icons/phone.svg' width={12} height={12} className='mr-2' />
        <span>{speaker?.acf?.phone}</span>
      </Link> */}
    </div>
  )
}
