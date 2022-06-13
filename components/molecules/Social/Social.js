import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function Social() {
  return (
    <div className='flex flex-row'>
      <Link href='/' className='mr-4'>
        <Image
          src='/icons/linkedin.svg'
          width={24}
          height={24}
          alt='LinkedIn'
        />
      </Link>

      <Link href='/'>
        <Image src='/icons/twitter.svg' width={24} height={24} alt='Twitter' />
      </Link>
    </div>
  )
}
