import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function Sponsor({ sponsor }) {
  return (
    <div className='mb-3 relative border'>
      <Link
        href={`tel:${sponsor?.link}`}
        className='flex text-sm font-bold w-full h-40 relative'
        urlExternal={true}
      >
        <Image src={sponsor?.image} fill={true} cover={false} />
      </Link>
    </div>
  )
}
