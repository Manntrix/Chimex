import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import Card, { AdCard } from '@/components/molecules/Card'

export default function ThreeColumnPosts({ top, cta_1, cta_2, ad }) {
  return (
    <>
      <div style={{ marginTop: `${top}rem` }}>
        <Section className='relative'>
          <div className='lg:grid lg:grid-cols-4'>
            <div className='lg:col-span-3 lg:grid lg:grid-cols-2'>
              <Card {...cta_1} />

              <Card {...cta_2} />
            </div>

            <div className='flex justify-center mt-8 lg:mt-0'>
              <AdCard ad={ad} />
            </div>
          </div>

          <div className='absolute right-0 top-0 -z-10'>
            <Image
              src='/images/home-three-column-posts-shape.svg'
              width={610}
              height={590}
            />
          </div>
        </Section>
      </div>
    </>
  )
}
