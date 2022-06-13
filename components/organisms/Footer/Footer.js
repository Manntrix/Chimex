import Image from '@/components/atoms/Image'
import FooterCopyright from './FooterCopyright'
import FooterCTA from './FooterCTA'
import FooterMenu from './FooterMenu'
import FooterSubscribe from './FooterSubscribe'

export default function Footer() {
  return (
    <>
      <FooterCTA />

      <footer className='bg-blue-deep relative'>
        <FooterSubscribe />
        <FooterMenu />
        <FooterCopyright />

        <Image
          src='/images/footer-shape.svg'
          width={783}
          height={248}
          className='absolute right-0 bottom-0 z-0'
        />
      </footer>
    </>
  )
}
