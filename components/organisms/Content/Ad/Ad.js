import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function Ad({ image, width, height, link, className }) {
  return (
    <Link href={link} urlExternal={true} className={className}>
      <Image src={image} width={parseInt(width)} height={parseInt(height)} />
    </Link>
  )
}
